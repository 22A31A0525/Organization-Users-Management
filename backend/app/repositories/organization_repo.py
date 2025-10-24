
from fastapi import Depends
from ..models import organization
from ..core.database import get_db
from .. import schemas



def get_organization(db, org_id: int):
    return db.query(organization.Organization)\
             .filter(organization.Organization.id == org_id).first()

# This is like `findBySlug(slug)`
def get_organization_by_slug(db, slug: str):
    return db.query(organization.Organization)\
             .filter(organization.Organization.slug == slug)\
             .first()

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


def update_organization(db, org_id: int, org_update):
    db_org = get_organization(db, org_id)
    if not db_org:
        return None  
    
    # .dict() converts the schema to a dictionary
    # exclude_unset=True means we only get the fields
    # the user *actually sent* in the request.
    update_data = org_update.dict(exclude_unset=True)

    # Loop over the data and update the DB model
    for key, value in update_data.items():
        setattr(db_org, key, value)
    print(update_data)

    # Commit the changes
    db.commit()
    db.refresh(db_org)
    return db_org