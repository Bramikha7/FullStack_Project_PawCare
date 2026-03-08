from pydantic import BaseModel
from typing import Optional

class UpcomingVaccinationDriveBase(BaseModel):
    title: str
    location: str
    drive_date: str
    drive_time_raw: str
    status: Optional[str] = "Scheduled"

class UpcomingVaccinationDriveUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    drive_date: Optional[str] = None
    drive_time_raw: Optional[str] = None
    status: Optional[str] = None