from sqlalchemy.orm import Session
from .. import repositories, schemas
from fastapi import HTTPException 
import shutil
import uuid
import os



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


# Update the logo url
def update_organization_logo_url(db,org_id,file,file_path,filename):

    db_org = repositories.organization_repo.get_organization(db, org_id)

    if not db_org:
        raise HTTPException(status_code=404, detail="Organization not found")
    
    old_logo_url = db_org.logo_url


    # Save the file to disk
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")
    finally:
        file.file.close()  
        
    # URL
    logo_url = f"/static/uploads/{filename}"
   
    updated_org = repositories.organization_repo.update_logo_url(
        db, 
        db_org,
        logo_url
    )

    if old_logo_url:
        
        old_file_path = old_logo_url.lstrip('/') 
        
        try:
            # Check if the file actually exists on disk
            if os.path.exists(old_file_path):
                # Delete the file
                os.remove(old_file_path)
        except OSError as e:
            print(f"Error deleting old file {old_file_path}: {e}")
    return updated_org
    


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

    
    