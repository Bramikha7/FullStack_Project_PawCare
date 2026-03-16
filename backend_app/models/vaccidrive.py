from sqlalchemy import Column, Integer, String, Date, Time
from db.database import Base
class UpcomingVaccinationDrive(Base):
    __tablename__ = "upcoming_vaccination_drives"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    drive_date = Column(String, nullable=False)
    drive_time = Column(String, nullable=False)
    status = Column(String, default="Scheduled")