from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routers import volunt, ngo, vaccidrive, contact, case, donation

# Create app
app = FastAPI()

# Enable CORS (important for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(volunt.router)
app.include_router(ngo.router)
app.include_router(vaccidrive.router)
app.include_router(contact.router)
app.include_router(case.router)
app.include_router(donation.router)

# Simple test route
# @app.get("/")
# def read_root():
#     return {"message": "Backend is running successfully"}

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), "frontend")

app.mount("/pages", StaticFiles(directory=os.path.join(FRONTEND_DIR, "pages")), name="pages")
app.mount("/js", StaticFiles(directory=os.path.join(FRONTEND_DIR, "js")), name="js")
app.mount("/styles", StaticFiles(directory=os.path.join(FRONTEND_DIR, "styles")), name="styles")

@app.get("/")
def read_root():
    return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))