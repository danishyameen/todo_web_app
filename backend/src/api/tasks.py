from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import SQLModel, Session, select
from typing import List, Optional
import uuid

from ..db.session import get_session
from ..models.task import Task, TaskCreate, TaskUpdate, TaskRead, TaskFilters
from ..models.user import User
from ..utils.jwt_utils import get_current_user_id
from ..utils.exceptions import handle_database_error
from ..services.task_service import TaskService


router = APIRouter()


@router.get("/",
            response_model=List[TaskRead],
            summary="Get all tasks for the current user",
            description="Retrieve all tasks belonging to the authenticated user, with optional filtering by status and priority.")
def get_tasks(
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id),
    status_filter: Optional[str] = Query(None, alias="status"),
    priority_filter: Optional[str] = Query(None, alias="priority"),
    limit: int = Query(100, ge=1, le=1000, description="Number of tasks to return"),
    offset: int = Query(0, ge=0, description="Offset for pagination")
):
    """Get all tasks for the current user."""
    try:
        task_service = TaskService(session)

        tasks = task_service.get_tasks_by_user(
            user_id=current_user_id,
            status=status_filter,
            priority=priority_filter,
            limit=limit,
            offset=offset
        )
        return tasks
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "getting tasks")


@router.get("/{task_id}",
            response_model=TaskRead,
            summary="Get a specific task by ID",
            description="Retrieve a specific task by its ID, if it belongs to the authenticated user.")
def get_task(task_id: uuid.UUID, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Get a specific task by ID."""
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Check if the task belongs to the current user
    if task.user_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this task")

    return task


@router.post("/",
             response_model=TaskRead,
             summary="Create a new task",
             description="Create a new task for the authenticated user.")
def create_task(task: TaskCreate, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Create a new task."""
    try:
        task_service = TaskService(session)
        db_task = task_service.create_task(task, current_user_id)
        return db_task
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "task creation")


@router.put("/{task_id}",
            response_model=TaskRead,
            summary="Update an existing task",
            description="Update an existing task if it belongs to the authenticated user.")
def update_task(task_id: uuid.UUID, task_update: TaskUpdate, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Update an existing task."""
    try:
        task_service = TaskService(session)
        db_task = task_service.update_task(task_id, task_update, current_user_id)

        if not db_task:
            raise HTTPException(status_code=404, detail="Task not found or not authorized")

        return db_task
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "task update")


@router.delete("/{task_id}",
               summary="Delete a task",
               description="Delete a task by its ID if it belongs to the authenticated user.")
def delete_task(task_id: uuid.UUID, session: Session = Depends(get_session), current_user_id: str = Depends(get_current_user_id)):
    """Delete a task."""
    try:
        task_service = TaskService(session)
        success = task_service.delete_task(task_id, current_user_id)

        if not success:
            raise HTTPException(status_code=404, detail="Task not found or not authorized")

        return {"message": "Task deleted successfully"}
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "task deletion")


class BulkTaskUpdateRequest(SQLModel):
    task_ids: List[uuid.UUID]
    update_data: TaskUpdate


class BulkTaskDeleteRequest(SQLModel):
    task_ids: List[uuid.UUID]


@router.post("/bulk-update",
             summary="Bulk update tasks",
             description="Update multiple tasks at once for the authenticated user.")
def bulk_update_tasks(
    bulk_request: BulkTaskUpdateRequest,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    """Bulk update multiple tasks."""
    try:
        task_service = TaskService(session)

        updated_count = task_service.bulk_update_tasks(
            task_ids=bulk_request.task_ids,
            update_data=bulk_request.update_data,
            user_id=current_user_id
        )

        return {"message": f"Successfully updated {updated_count} tasks", "updated_count": updated_count}
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "bulk task update")


@router.post("/bulk-delete",
             summary="Bulk delete tasks",
             description="Delete multiple tasks at once for the authenticated user.")
def bulk_delete_tasks(
    bulk_request: BulkTaskDeleteRequest,
    session: Session = Depends(get_session),
    current_user_id: str = Depends(get_current_user_id)
):
    """Bulk delete multiple tasks."""
    try:
        task_service = TaskService(session)

        deleted_count = task_service.bulk_delete_tasks(
            task_ids=bulk_request.task_ids,
            user_id=current_user_id
        )

        return {"message": f"Successfully deleted {deleted_count} tasks", "deleted_count": deleted_count}
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        handle_database_error(e, "bulk task deletion")