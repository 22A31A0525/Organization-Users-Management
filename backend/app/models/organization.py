from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..core.database import Base
from sqlalchemy.orm import relationship


class Organization(Base):
    __tablename__ = "organizations"

    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    status = Column(String, default="active") 
    logo_url=Column(String, index=False)
    support_email = Column(String,index=True)
    contact_no=Column(String, index=True)
    alternative_phone=Column(String, index=False)
    primary_admin_name=Column(String, index=False)
    primary_admin_email=Column(String, index=False)
    website_url=Column(String, index=False) 
    max_coordinators=Column(Integer, index=False)
    timezone=Column(String, index=False) 

    # Auto-set on insert
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
   
    # Auto-update on change
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


    # Relationship to users
    users = relationship("User", back_populates="organization")

    