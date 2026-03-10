from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config import USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE
import os

# Get connection string from env or construct it
DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    DB_URL = f"postgresql+psycopg2://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT}/{DATABASE}"

# For Neon, ensure sslmode is present if it's a neon host
if "neon.tech" in DB_URL and "sslmode" not in DB_URL:
    if "?" in DB_URL:
        DB_URL += "&sslmode=require"
    else:
        DB_URL += "?sslmode=require"

engine = create_engine(DB_URL)
Sessionlocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()
