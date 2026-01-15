from fastapi import HTTPException, status


class DatabaseError(Exception):
    """Custom exception for database-related errors."""
    pass


class ValidationError(Exception):
    """Custom exception for validation errors."""
    pass


class AuthenticationError(Exception):
    """Custom exception for authentication errors."""
    pass


class AuthorizationError(Exception):
    """Custom exception for authorization errors."""
    pass


def handle_database_error(error: Exception, operation: str = "database operation"):
    """Handle database errors and convert them to appropriate HTTP exceptions."""
    error_msg = str(error).lower()

    # Check for common database errors
    if "foreign key constraint" in error_msg or "integrity constraint" in error_msg:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Integrity constraint violation. Related data may not exist."
        )
    elif "unique constraint" in error_msg or "duplicate" in error_msg:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Duplicate entry. This record already exists."
        )
    elif "not null" in error_msg:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing required field."
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error during {operation}: {str(error)}"
        )