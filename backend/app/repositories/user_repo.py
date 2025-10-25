from sqlalchemy.orm import Session
from .. import  schemas
from ..models import user
from ..models import organization
from fastapi import HTTPException



# Get user by Id
def get_user_by_id(db: Session, user_id: int):
    return db.query(user.User).filter(user.User.id == user_id).first()

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



# Update user
def update_user(db,user_id,user_update):
    
    user_data=get_user_by_id(db,user_id)

    if not user_data:
        return None
    
    update_data = user_update.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(user_data, key, value)
 
    # Commit the changes
    db.commit()
    db.refresh(user_data)
    return user_data


# Delete user by user entity
def delete_user(db:Session,user):
    db.delete(user)
    db.commit()
    return  "User Deleted Successfully "

# Delete users by organization ID
def delete_users_by_organization(db: Session, org_id: int):
    
    
    db.query(user.User)\
      .filter(user.User.organization_id == org_id)\
      .delete(synchronize_session=False)

    db.commit()
    return True

