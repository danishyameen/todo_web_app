from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
import uuid

from ..db.session import get_session
from ..models.category import Category, CategoryCreate, CategoryUpdate, CategoryRead
from ..models.user import User
from ..utils.jwt_utils import get_current_user_id
from ..utils.exceptions import handle_database_error


router = APIRouter(prefix="/categories")


@router.get("/", response_model=List[CategoryRead])
def get_categories(session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Get all categories for the current user."""
    categories = session.exec(
        select(Category).where(Category.user_id == current_user_id)
    ).all()

    return categories


@router.get("/{category_id}", response_model=CategoryRead)
def get_category(category_id: uuid.UUID, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Get a specific category by ID."""
    category = session.get(Category, category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    # Check if the category belongs to the current user
    if category.user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this category")

    return category


@router.post("/", response_model=CategoryRead)
def create_category(category: CategoryCreate, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Create a new category."""
    try:
        # Ensure the category is assigned to the current user
        category_data = category.dict()
        category_data['user_id'] = current_user_id

        db_category = Category(**category_data)
        session.add(db_category)
        session.commit()
        session.refresh(db_category)

        return db_category
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "category creation")


@router.put("/{category_id}", response_model=CategoryRead)
def update_category(category_id: uuid.UUID, category_update: CategoryUpdate, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Update an existing category."""
    try:
        db_category = session.get(Category, category_id)

        if not db_category:
            raise HTTPException(status_code=404, detail="Category not found")

        # Check if the category belongs to the current user
        if db_category.user_id != current_user_id:
            raise HTTPException(status_code=403, detail="Not authorized to update this category")

        # Update the category with the provided fields
        update_data = category_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_category, field, value)

        session.add(db_category)
        session.commit()
        session.refresh(db_category)

        return db_category
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "category update")


@router.delete("/{category_id}")
def delete_category(category_id: uuid.UUID, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Delete a category."""
    try:
        category = session.get(Category, category_id)

        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

        # Check if the category belongs to the current user
        if category.user_id != current_user_id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this category")

        session.delete(category)
        session.commit()

        return {"message": "Category deleted successfully"}
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "category deletion")