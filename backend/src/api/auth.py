from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import Dict

from ..db.session import get_session
from ..models.user import UserCreate, UserLogin, UserUpdate
from ..services.auth_service import AuthService
from ..utils.jwt_utils import verify_access_token
from ..utils.exceptions import handle_database_error


router = APIRouter()


@router.post("/register",
             response_model=Dict[str, str],
             summary="Register a new user",
             description="Create a new user account with the provided details.")
def register(user_create: UserCreate, session: Session = Depends(get_session)):
    """Register a new user."""
    auth_service = AuthService(session)

    try:
        user = auth_service.register_user(user_create)
        tokens = auth_service.create_auth_tokens(user)

        return {
            "access_token": tokens["access_token"],
            "refresh_token": tokens["refresh_token"],
            "token_type": tokens["token_type"],
            "user_id": str(user.id),
            "email": user.email
        }
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "user registration")


@router.post("/login",
             response_model=Dict[str, str],
             summary="Login a user",
             description="Authenticate a user and return access tokens.")
def login(user_login: UserLogin, session: Session = Depends(get_session)):
    """Login a user and return access tokens."""
    auth_service = AuthService(session)

    user = auth_service.authenticate_user(user_login.email, user_login.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Inactive user",
            headers={"WWW-Authenticate": "Bearer"},
        )

    tokens = auth_service.create_auth_tokens(user)

    return {
        "access_token": tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "token_type": tokens["token_type"],
        "user_id": str(user.id),
        "email": user.email
    }


@router.post("/refresh",
             summary="Refresh access token",
             description="Generate a new access token using a refresh token.")
def refresh_token(refresh_token: str, session: Session = Depends(get_session)):
    """Refresh an access token using a refresh token."""
    auth_service = AuthService(session)

    try:
        tokens = auth_service.refresh_access_token(refresh_token)
        return tokens
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed"
        )


@router.post("/logout",
             summary="Logout a user",
             description="Logout a user (client-side token invalidation).")
def logout():
    """Logout a user (client-side token invalidation)."""
    # In a real application, you might want to add the token to a blacklist
    return {"message": "Successfully logged out"}


@router.get("/me",
            summary="Get current user info",
            description="Retrieve information about the currently authenticated user based on the provided token.")
def get_current_user(token: str, session: Session = Depends(get_session)):
    """Get current user info based on the provided token."""
    try:
        payload = verify_access_token(token)
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )

        auth_service = AuthService(session)
        user = auth_service.get_user_by_id(user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )

        return {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_active": user.is_active,
            "is_verified": user.is_verified
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )


@router.put("/profile",
            summary="Update user profile",
            description="Update the authenticated user's profile information.")
def update_profile(user_update: UserUpdate, token: str = Depends(verify_access_token), session: Session = Depends(get_session)):
    """Update user profile information."""
    try:
        # Extract user ID from token
        current_user_id = token.get("sub")

        if not current_user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )

        auth_service = AuthService(session)
        user = auth_service.get_user_by_id(current_user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        # Update the user with provided fields
        update_data = user_update.dict(exclude_unset=True)

        # Prevent changing email to an existing one
        if 'email' in update_data:
            existing_user = auth_service.get_user_by_email(update_data['email'])
            if existing_user and existing_user.id != user.id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )

        for field, value in update_data.items():
            setattr(user, field, value)

        session.add(user)
        session.commit()
        session.refresh(user)

        return {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_active": user.is_active,
            "is_verified": user.is_verified
        }
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "profile update")