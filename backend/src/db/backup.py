import subprocess
import os
import logging
from datetime import datetime, timedelta
from pathlib import Path
import shutil
from typing import Optional

logger = logging.getLogger(__name__)


class DatabaseBackupManager:
    """Handles database backup and recovery operations."""

    def __init__(self, db_url: str, backup_dir: str = "./backups"):
        self.db_url = db_url
        self.backup_dir = Path(backup_dir)
        self.backup_dir.mkdir(exist_ok=True)

    def create_backup(self, backup_name: Optional[str] = None) -> str:
        """Create a database backup using pg_dump."""
        if not backup_name:
            backup_name = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sql"

        backup_path = self.backup_dir / backup_name

        try:
            # Parse the database URL to extract connection parameters
            # Expected format: postgresql://user:password@host:port/database
            if self.db_url.startswith("postgresql://"):
                # Extract components from the URL
                from urllib.parse import urlparse
                parsed = urlparse(self.db_url)

                cmd = [
                    "pg_dump",
                    "--dbname", f"postgresql://{parsed.username}:{parsed.password}@{parsed.hostname}:{parsed.port}{parsed.path}",
                    "--verbose",
                    "--clean",
                    "--no-owner",
                    "--no-privileges",
                    "--file", str(backup_path)
                ]

                logger.info(f"Creating backup: {backup_path}")
                result = subprocess.run(cmd, capture_output=True, text=True)

                if result.returncode != 0:
                    logger.error(f"Backup failed: {result.stderr}")
                    raise Exception(f"Backup failed: {result.stderr}")

                logger.info(f"Backup created successfully: {backup_path}")
                return str(backup_path)

        except Exception as e:
            logger.error(f"Error creating backup: {str(e)}")
            raise

    def restore_backup(self, backup_path: str) -> bool:
        """Restore database from a backup file."""
        backup_file = Path(backup_path)

        if not backup_file.exists():
            raise FileNotFoundError(f"Backup file does not exist: {backup_file}")

        try:
            # Parse the database URL to extract connection parameters
            from urllib.parse import urlparse
            parsed = urlparse(self.db_url)

            cmd = [
                "psql",
                f"postgresql://{parsed.username}:{parsed.password}@{parsed.hostname}:{parsed.port}{parsed.path}",
                "--file", str(backup_file)
            ]

            logger.info(f"Restoring from backup: {backup_file}")
            result = subprocess.run(cmd, capture_output=True, text=True)

            if result.returncode != 0:
                logger.error(f"Restore failed: {result.stderr}")
                raise Exception(f"Restore failed: {result.stderr}")

            logger.info("Database restored successfully")
            return True

        except Exception as e:
            logger.error(f"Error restoring backup: {str(e)}")
            raise

    def list_backups(self) -> list:
        """List all available backups."""
        backups = []
        for file in self.backup_dir.glob("*.sql"):
            backups.append({
                "name": file.name,
                "size": file.stat().st_size,
                "modified": datetime.fromtimestamp(file.stat().st_mtime),
                "path": str(file)
            })

        # Sort by modification time (newest first)
        backups.sort(key=lambda x: x["modified"], reverse=True)
        return backups

    def delete_old_backups(self, days_to_keep: int = 30):
        """Delete backups older than specified days."""
        cutoff_date = datetime.now() - timedelta(days=days_to_keep)
        deleted_count = 0

        for backup in self.list_backups():
            if backup["modified"] < cutoff_date:
                backup_path = Path(backup["path"])
                backup_path.unlink()
                logger.info(f"Deleted old backup: {backup_path}")
                deleted_count += 1

        logger.info(f"Deleted {deleted_count} old backups")
        return deleted_count


class DataArchivalManager:
    """Manages data archival for old tasks."""

    def __init__(self, session):
        self.session = session

    def archive_completed_tasks(self, days_old: int = 365) -> int:
        """Archive completed tasks older than specified days."""
        from datetime import datetime, timedelta
        from sqlmodel import select
        from ..models.task import Task

        cutoff_date = datetime.utcnow() - timedelta(days=days_old)

        # Find completed tasks older than the cutoff date
        archived_tasks = self.session.exec(
            select(Task).where(
                Task.status == "completed",
                Task.updated_at < cutoff_date
            )
        ).all()

        archived_count = len(archived_tasks)

        # In a real implementation, you might move these to an archive table
        # For now, we'll just log the archival action
        logger.info(f"Found {archived_count} tasks to archive (older than {days_old} days)")

        # If you wanted to implement actual archiving, you could:
        # 1. Move the tasks to an archive table
        # 2. Mark them as archived in the current table
        # 3. Soft delete them
        # 4. Or export them to a separate storage system

        return archived_count

    def get_archivable_tasks_count(self, days_old: int = 365) -> int:
        """Get count of tasks that can be archived."""
        from datetime import datetime, timedelta
        from sqlmodel import select, func
        from ..models.task import Task

        cutoff_date = datetime.utcnow() - timedelta(days=days_old)

        count = self.session.exec(
            select(func.count(Task.id)).where(
                Task.status == "completed",
                Task.updated_at < cutoff_date
            )
        ).one()

        return count


def schedule_regular_backups():
    """Function to schedule regular backups (to be used with cron or similar)."""
    import os
    from ..config.settings import settings

    backup_manager = DatabaseBackupManager(settings.DATABASE_URL)

    try:
        backup_path = backup_manager.create_backup()
        print(f"Regular backup completed: {backup_path}")
    except Exception as e:
        print(f"Regular backup failed: {str(e)}")
        logger.error(f"Regular backup failed: {str(e)}")