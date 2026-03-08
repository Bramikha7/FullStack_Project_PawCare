from sqlalchemy import text
from db.database import engine

def migrate():
    with engine.connect() as conn:
        try:
            # PostgreSQL command to change column type
            # We use ALTER TABLE ... ALTER COLUMN ... TYPE ... USING ...
            # USING is important to convert existing data if possible
            conn.execute(text("ALTER TABLE upcoming_vaccination_drives ALTER COLUMN drive_date TYPE VARCHAR USING drive_date::varchar"))
            conn.execute(text("ALTER TABLE upcoming_vaccination_drives ALTER COLUMN drive_time TYPE VARCHAR USING drive_time::varchar"))
            conn.commit()
            print("Migration successful!")
        except Exception as e:
            conn.rollback()
            print(f"Migration failed or columns already updated: {e}")

if __name__ == "__main__":
    migrate()
