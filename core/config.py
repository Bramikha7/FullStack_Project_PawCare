from dotenv import load_dotenv
import os
load_dotenv()
USERNAME = os.getenv("DB_USERNAME", "postgres")
PASSWORD = os.getenv("DB_PASSWORD", "AcademyRootPassword")
HOSTNAME = os.getenv("DB_HOSTNAME", "localhost")
PORT = os.getenv("DB_PORT", "5432")
# Check for database name in this order: Environment 'DATABASE', then 'DB_DATABASE', then default to 'neondb'
DATABASE = os.getenv("DATABASE") or os.getenv("DB_DATABASE") or "neondb"


