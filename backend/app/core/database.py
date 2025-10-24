from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings  # Import your settings


# This connects to the database URL from your config.py
engine = create_engine(settings.DATABASE_URL)

# This class is responsible for creating new DB sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Your database models (in app/models/) will inherit from this class
Base = declarative_base()


# to get a database session for each request.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()