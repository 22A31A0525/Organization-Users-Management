from pydantic import BaseModel, EmailStr
from typing import Optional 


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    status: Optional[str] = None
    logo_url: Optional[str] = None
    support_email: Optional[EmailStr] = None
    phone: Optional[str] = None
    alternative_phone: Optional[str] = None
    primary_admin_name: Optional[str] = None
    primary_admin_email: Optional[EmailStr] = None
    website_url: Optional[str] = None
    max_coordinators: Optional[int] = None
    timezone: Optional[str] = None


class OrganizationCreate(BaseModel):
    name: str
    slug: str
    support_email: EmailStr
    phone: str

class OrganizationRead(BaseModel):
    id: int
    name: str
    slug: str
    status: str
    logo_url: Optional[str] = None
    support_email: EmailStr
    phone: Optional[str] = None
    alternative_phone: Optional[str] = None
    primary_admin_name: Optional[str] = None
    primary_admin_email: Optional[EmailStr] = None
    website_url: Optional[str] = None
    max_coordinators: Optional[int] = None
    timezone: Optional[str] = None