from sqlmodel import create_engine, Session
from ..config.settings import settings
from typing import Generator
from sqlalchemy.pool import QueuePool

# Create the database engine with connection pooling
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DB_ECHO,
    pool_pre_ping=True,
    pool_size=20,  # Number of connections to maintain in the pool
    max_overflow=30,  # Number of connections beyond pool_size that can be opened
    pool_recycle=3600,  # Recycle connections after 1 hour
    pool_timeout=30,  # Seconds to wait before giving up on getting a connection
    poolclass=QueuePool,  # Use QueuePool as the pool class
)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session