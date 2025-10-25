from fastapi import FastAPI,APIRouter
from .core.database import engine
from .models import organization,user
from .routers import organizations,users
from fastapi.middleware.cors import CORSMiddleware
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

origins = [
    "http://localhost:5173",  # The URL of your React app
   
]

# --- . ADD THE MIDDLEWARE ---

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from your React app
    allow_credentials=True,
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)


@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Organization API!"}
