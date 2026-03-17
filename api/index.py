import sys
import os
from pathlib import Path

# Add backend_app directory to sys.path so main.py and internal modules can be imported
sys.path.append(str(Path(__file__).parent.parent / "backend_app"))

from backend_app.main import app
