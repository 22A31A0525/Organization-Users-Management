# User schemas

from pydantic import BaseModel, EmailStr
from typing import Optional

# Base properties
class UserBase(BaseModel):
    name: str
    role: str
    organization_id: int

# Schema for reading a user
class UserRead(UserBase):
    id: int
    organization_id: int

# Schema for updating a user
class UserUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
   