from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from fastapi.middleware.cors import CORSMiddleware
from routers import volunt, ngo, vaccidrive, contact, case, donation
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    from db.database import engine, Base, DB_URL
    import logging
    # Masking password for security in logs
    masked_url = DB_URL.split("@")[-1] if "@" in DB_URL else "unknown"
    print(f"Connecting to database host/name: {masked_url}")
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables verified/created successfully.")
    except Exception as e:
        print(f"Database connection failed during startup: {e}")

# Include Routers

app.include_router(volunt.router)
app.include_router(ngo.router)
app.include_router(vaccidrive.router)
app.include_router(contact.router)
app.include_router(case.router)
app.include_router(donation.router)

# Serve Static Files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app.mount("/pages", StaticFiles(directory=os.path.join(BASE_DIR, "pages")), name="pages")
app.mount("/js", StaticFiles(directory=os.path.join(BASE_DIR, "js")), name="js")
app.mount("/styles", StaticFiles(directory=os.path.join(BASE_DIR, "styles")), name="styles")
if os.path.exists(os.path.join(BASE_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(BASE_DIR, "assets")), name="assets")

@app.get("/")
def read_root():
    return FileResponse(os.path.join(BASE_DIR, "index.html"))


