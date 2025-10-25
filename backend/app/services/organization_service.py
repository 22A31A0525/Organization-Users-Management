from sqlalchemy.orm import Session
from .. import repositories, schemas
from fastapi import HTTPException 



# Create organization
def create_new_organization(db, org):

    # Check if a slug already exists
    db_org = repositories.organization_repo.get_organization_by_slug(db, slug=org.slug)
    if db_org:
        raise HTTPException(status_code=400, detail="Slug already registered")

    # Call the repository to create a organization
    return repositories.organization_repo.create_organization(db=db, org=org)

# Get Organization
def get_org_details(db,org_id):

    db_org = repositories.organization_repo.get_organization(db, org_id)
    
    # if no org found based on org_id it raises a 404 resource not found HTTPException
    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    return db_org

# Get Orgs
def get_orgs(db):
    return repositories.organization_repo.get_organizations_list(db)

# Update Organization
def update_existing_organization(db, org_id: int, org_update):
    
    db_org = repositories.organization_repo.update_organization(db, org_id, org_update)
    
    # if no org found based on org_id it raises a 404 resource not found HTTPException
    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    return db_org

# Delete Organization
def delete_org_by_org_id(db,org_id):

    db_org = repositories.organization_repo.get_organization(db, org_id)

    # if no org found based on org_id it raises a 404 resource not found HTTPException
    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    # Delete all users belonging to that organization 
    repositories.user_repo.delete_users_by_organization(db, org_id=org_id)

    # Delete the organization itself
    return repositories.organization_repo.delete_organization(db,db_org)

    
    