from fastapi import APIRouter, Depends,HTTPException
from .. import repositories
from sqlalchemy.orm import Session
from ..repositories import organization_repo
from ..core.database import get_db
from ..services import organization_service
from ..schemas import organization


router = APIRouter(
    prefix="/organizations"
)

@router.post("/")
def hey(org: organization.OrganizationCreate,db: Session = Depends(get_db)):
    try:
        new_org = organization_service.create_new_organization(db=db, org=org)
        return new_org
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
    

@router.put("/{org_id}", response_model=organization.OrganizationRead)
def update_organization_details(
    org_id: int,
    org_update: organization.OrganizationUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update details for a specific organization.
    """
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