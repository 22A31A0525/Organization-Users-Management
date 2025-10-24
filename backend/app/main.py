from fastapi import FastAPI,APIRouter
from .core.database import engine
from .models import organization
from .routers import organizations

#create a tables in database(Organization-Users-Management)
organization.Base.metadata.create_all(bind=engine)

app=FastAPI()


app.include_router(organizations.router)