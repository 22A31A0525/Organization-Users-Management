from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from typing import List
from ..schemas import user
from ..services import user_service


# Users API prefix
router = APIRouter(
    prefix="/users"
)

# Create user in organization
@router.post("/")
def create_user(
    user: user.UserBase, #Request body
    db: Session = Depends(get_db)
):
   
    try:
        new_user = user_service.create_new_user(db=db, user=user)
        return new_user
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Get users for organization
@router.get("/by-organization/{org_id}")
def read_users_for_organization(
    org_id: int, db: 
    Session = Depends(get_db)
):

    try:
        users = user_service.get_users_for_organization(db, org_id)
        return users
    
    except HTTPException as e:
        raise e 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))