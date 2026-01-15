from sqlmodel import SQLModel, Field, Relationship, Column, DateTime
from sqlalchemy import String
from typing import Optional
from datetime import datetime
import uuid

from .user import User

class TaskBase(SQLModel):
    title: str = Field(sa_column=Column(String, nullable=False))
    description: Optional[str] = Field(sa_column=Column(String))
    status: str = Field(default="pending", sa_column=Column(String, nullable=False))
    priority: str = Field(default="medium", sa_column=Column(String, nullable=False))  # low, medium, high
    due_date: Optional[datetime] = Field(sa_column=Column(DateTime))
    completed_at: Optional[datetime] = Field(sa_column=Column(DateTime))
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    category_id: Optional[uuid.UUID] = Field(foreign_key="categories.id", default=None)

class Task(TaskBase, table=True):
    __tablename__ = "tasks"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(sa_column=Column(DateTime, nullable=False, default=datetime.utcnow))
    updated_at: datetime = Field(sa_column=Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow))

    # Relationships
    user: User = Relationship(back_populates="tasks")
    category: Optional["Category"] = Relationship(back_populates="tasks")

class TaskRead(TaskBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

class TaskCreate(TaskBase):
    pass

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] = None

class TaskFilters(SQLModel):
    status: Optional[str] = None
    priority: Optional[str] = None
    user_id: Optional[uuid.UUID] = None