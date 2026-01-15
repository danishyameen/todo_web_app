from sqlmodel import SQLModel, Field, Relationship, Column, DateTime
from sqlalchemy import String
from typing import Optional, List
from datetime import datetime
import uuid

from .user import User

class CategoryBase(SQLModel):
    name: str = Field(sa_column=Column(String, nullable=False))
    description: Optional[str] = Field(sa_column=Column(String))
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)

class Category(CategoryBase, table=True):
    __tablename__ = "categories"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(sa_column=Column(DateTime, nullable=False, default=datetime.utcnow))
    updated_at: datetime = Field(sa_column=Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow))

    # Relationships
    user: User = Relationship(back_populates="categories")
    tasks: List["Task"] = Relationship(back_populates="category")

class CategoryRead(CategoryBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(SQLModel):
    name: Optional[str] = None
    description: Optional[str] = None