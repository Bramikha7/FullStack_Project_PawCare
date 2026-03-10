import sys
import os
from pathlib import Path

# Add root directory to sys.path so main.py can be imported
sys.path.append(str(Path(__file__).parent.parent))

from main import app
