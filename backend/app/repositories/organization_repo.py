
from fastapi import Depends
from ..models import organization
from ..core.database import get_db
from .. import schemas
from sqlalchemy.orm import load_only


# Get organization by ID
def get_organization(db, org_id: int):
    return db.query(organization.Organization)\
             .filter(organization.Organization.id == org_id).first()

# Get organization by slug
def get_organization_by_slug(db, slug: str):
    return db.query(organization.Organization)\
             .filter(organization.Organization.slug == slug)\
             .first()

# Get All Orgs
def get_organizations_list(db):
    
    # Fetches a list of organizations, but ONLY loads the id, name, and status columns from the database.
    
    return db.query(organization.Organization)\
             .options(load_only(
                 organization.Organization.id,
                 organization.Organization.name,
                 organization.Organization.status,
                 organization.Organization.logo_url
             ))\
             .all()

# Create organization
def create_organization(db, org):
    #  Convert DTO (schema) to Entity (model)
    db_organization = organization.Organization(
        name=org.name,
        slug=org.slug,
        support_email=org.support_email,
        contact_no=org.phone
    )
    
    #  Add to session, commit, and refresh
    db.add(db_organization)
    db.commit()
    db.refresh(db_organization)
    return db_organization


# Update organization
def update_organization(db, org_id: int, org_update):

    db_org = get_organization(db, org_id)

    if not db_org:
        return None  
    
    # .dict() converts the schema to a dictionary & exclude_unset=True means we only get the fields
    update_data = org_update.dict(exclude_unset=True)

    # Loop over the data and update the DB model
    for key, value in update_data.items():
        setattr(db_org, key, value)
 

    # Commit the changes
    db.commit()
    db.refresh(db_org)
    return db_org


# Delete organization
def delete_organization(db,db_org):
    db.delete(db_org)
    db.commit()
    return "Successfully Deleted Org "+str(db_org.id)