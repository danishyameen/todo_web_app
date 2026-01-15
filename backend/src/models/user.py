from sqlmodel import SQLModel, Field, Column, DateTime, Relationship
from sqlalchemy import String
from typing import Optional, List
from datetime import datetime
import uuid

class UserBase(SQLModel):
    email: str = Field(sa_column=Column(String, unique=True, nullable=False))
    first_name: str
    last_name: str
    is_active: bool = True
    is_verified: bool = False

class User(UserBase, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str = Field(nullable=False)
    created_at: datetime = Field(sa_column=Column(DateTime, nullable=False, default=datetime.utcnow))
    updated_at: datetime = Field(sa_column=Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow))

    # Relationships
    tasks: List["Task"] = Relationship(back_populates="user")
    categories: List["Category"] = Relationship(back_populates="user")

class UserRead(UserBase):
    id: uuid.UUID

class UserCreate(UserBase):
    password: str

class UserUpdate(SQLModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    is_active: Optional[bool] = None

class UserLogin(SQLModel):
    email: str
    password: str