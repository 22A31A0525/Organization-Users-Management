from fastapi import APIRouter, Depends,HTTPException
from .. import repositories
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..services import organization_service
from ..schemas import organization
from typing import List
from fastapi import File, UploadFile
import shutil
import uuid
import os


# Organizations router
router = APIRouter(
    prefix="/organizations"
)


# Create organization
@router.post("/")
def create_organization(
    org: organization.OrganizationCreate, #The request body
    db: Session = Depends(get_db)
):
    try:
        new_org = organization_service.create_new_organization(db=db, org=org)
        return new_org
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500,  detail=str(e)) 
    

# Get organizaation
@router.get("/{org_id}")
def get_organization(
    org_id:int,
    db: Session = Depends(get_db)
):
    try:
        org_details=organization_service.get_org_details(db,org_id)
        return org_details
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    




 # Get All Organizations
@router.get("/",response_model=List[organization.AllOrganizationRead])
def get_organizations(
    db: Session = Depends(get_db)
):
    try:
        orgs=organization_service.get_orgs(db)
        return orgs
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#update organization logo 
@router.put("/{org_id}/logo")
def upload_organization_logo( 
    org_id: int,
    file: UploadFile = File(...), # This receives the file
    db: Session = Depends(get_db)
):
    

    # Get the file extension (e.g., .png, .jpg)
    _, extension = os.path.splitext(file.filename)
    
    # Created a unique name to prevent file collisions
    filename = f"{uuid.uuid4()}{extension}"
    
    # Created the full file path
    file_path = os.path.join("static/uploads", filename)
    
    try:
        updated_org = organization_service.update_organization_logo_url(
            db=db, 
            org_id=org_id, 
            file=file,
            file_path=file_path,
            filename=filename
        )
        return updated_org
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Update organization
@router.put("/{org_id}", response_model=organization.OrganizationRead)
def update_organization_details(
    org_id: int,
    org_update: organization.OrganizationUpdate, # The request body
    db: Session = Depends(get_db)
):
    try:
        updated_org = organization_service.update_existing_organization(
            db=db, 
            org_id=org_id, 
            org_update=org_update
        )
        return updated_org
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Delete organization
@router.delete("/{org_id}")
def delete_organization( 
    org_id:int,
    db: Session = Depends(get_db)
):
    try:
        delete_org=organization_service.delete_org_by_org_id(db,org_id)
        return delete_org
    
    except HTTPException as e:
        raise e
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    