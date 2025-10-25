from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings  # Import your settings


# Connect to database
engine = create_engine(settings.DATABASE_URL)

# Create DB session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base class for models
Base = declarative_base()


# Get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()