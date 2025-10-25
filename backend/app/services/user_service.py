from sqlalchemy.orm import Session
from .. import repositories, schemas
from ..repositories import organization_repo,user_repo 
from fastapi import HTTPException



# Create user in organization
def create_new_user(db, user):
    
    db_user =user_repo.get_user_by_name(db=db,username=user.name)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
        
    #Check if organization exists
    db_org = organization_repo.get_organization(db, org_id=user.organization_id)


    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")

    # call repository to create user
    return user_repo.create_user(db, user)



def get_users_for_organization(db, org_id):
    #Check if organization exists 
    db_org = organization_repo.get_organization(db, org_id=org_id)

    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")
        
    # Call repository
    return user_repo.get_users_by_organization(db, org_id)