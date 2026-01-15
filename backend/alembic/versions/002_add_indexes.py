"""Add indexes for performance optimization

Revision ID: 002
Revises: 001
Create Date: 2026-01-15 06:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from typing import Sequence, Union


# revision identifiers
revision: str = '002'
down_revision: Union[str, None] = '001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create indexes for better query performance
    op.create_index('idx_users_email', 'users', ['email'])
    op.create_index('idx_users_created_at', 'users', ['created_at'])

    op.create_index('idx_tasks_user_id', 'tasks', ['user_id'])
    op.create_index('idx_tasks_status', 'tasks', ['status'])
    op.create_index('idx_tasks_priority', 'tasks', ['priority'])
    op.create_index('idx_tasks_due_date', 'tasks', ['due_date'])
    op.create_index('idx_tasks_created_at', 'tasks', ['created_at'])
    op.create_index('idx_tasks_updated_at', 'tasks', ['updated_at'])
    op.create_index('idx_tasks_category_id', 'tasks', ['category_id'])

    op.create_index('idx_categories_user_id', 'categories', ['user_id'])
    op.create_index('idx_categories_name', 'categories', ['name'])


def downgrade() -> None:
    # Drop indexes
    op.drop_index('idx_categories_name', table_name='categories')
    op.drop_index('idx_categories_user_id', table_name='categories')

    op.drop_index('idx_tasks_category_id', table_name='tasks')
    op.drop_index('idx_tasks_updated_at', table_name='tasks')
    op.drop_index('idx_tasks_created_at', table_name='tasks')
    op.drop_index('idx_tasks_due_date', table_name='tasks')
    op.drop_index('idx_tasks_priority', table_name='tasks')
    op.drop_index('idx_tasks_status', table_name='tasks')
    op.drop_index('idx_tasks_user_id', table_name='tasks')

    op.drop_index('idx_users_created_at', table_name='users')
    op.drop_index('idx_users_email', table_name='users')