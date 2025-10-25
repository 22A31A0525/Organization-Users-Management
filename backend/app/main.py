from fastapi import FastAPI,APIRouter
from .core.database import engine
from .models import organization,user
from .routers import organizations,users
from fastapi.staticfiles import StaticFiles

# Create tables
organization.Base.metadata.create_all(bind=engine)
user.Base.metadata.create_all(bind=engine)


app=FastAPI()


# Include routers
app.include_router(organizations.router)
app.include_router(users.router)

# This makes the 'static' folder publicly available
app.mount("/static", StaticFiles(directory="static"), name="static")
