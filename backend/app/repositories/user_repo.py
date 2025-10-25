from sqlalchemy.orm import Session
from .. import  schemas
from ..models import user
from ..models import organization
from fastapi import HTTPException



# Get user by name
def get_user_by_name(db: Session, username: str):
    return db.query(user.User).filter(user.User.name == username).first()


# Get all users for an organization
def get_users_by_organization(db, org_id):
    return db.query(user.User)\
             .filter(user.User.organization_id == org_id)\
             .all()



# Create user
def create_user(db, User):
    
    db_user = user.User(
        name=User.name,
        role=User.role,
        organization_id=User.organization_id 
    )  

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# Delete users by organization ID
def delete_users_by_organization(db: Session, org_id: int):
    
    
    db.query(user.User)\
      .filter(user.User.organization_id == org_id)\
      .delete(synchronize_session=False)

    db.commit()
    return True