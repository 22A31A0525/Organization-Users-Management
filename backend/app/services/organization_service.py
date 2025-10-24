from sqlalchemy.orm import Session
from .. import repositories, schemas
from fastapi import HTTPException 

def create_new_organization(db, org):
    # Check if a slug already exists
    db_org = repositories.organization_repo.get_organization_by_slug(db, slug=org.slug)
    if db_org:
        raise HTTPException(status_code=400, detail="Slug already registered")

    # Call the repository to do the create a organization
    return repositories.organization_repo.create_organization(db=db, org=org)



def update_existing_organization(db, org_id: int, org_update):
    
    db_org = repositories.organization_repo.update_organization(db, org_id, org_update)
    
    # Check if the update was successful
    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    return db_org