from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..core.database import Base


class Organization(Base):
    __tablename__ = "organizations"

    # primary key for the table organizations
    id = Column(Integer, primary_key=True, index=True)
    
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    status = Column(String, default="active") 
    logo_url=Column(String, index=False)
    support_email = Column(String, unique=True)
    contact_no=Column(String, index=True)
    alternative_phone=Column(String, index=False)
    primary_admin_name=Column(String, index=False)
    primary_admin_email=Column(String, index=False)
    website_url=Column(String, index=False)
    max_coordinators=Column(Integer, index=False)
    timezone=Column(String, index=False) 

    # This tells the DATABASE (not Python) to set the timestamp 
    # to the current time when a new row is inserted.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
   
    # This tells the DATABASE to update this field to the current time
    # every time the row is changed.
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    