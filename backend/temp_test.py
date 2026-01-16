#!/usr/bin/env python3
"""Temporary file to test imports and debug the User model issue"""

# Import the user model to see the exact error
try:
    from src.models.user import UserBase, User, UserCreate, UserUpdate, UserLogin
    print("User models imported successfully!")
except Exception as e:
    print(f"Error importing user models: {e}")
    import traceback
    traceback.print_exc()