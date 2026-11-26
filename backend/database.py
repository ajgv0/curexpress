import sqlite3
from pathlib import Path

# El archivo de la base de datos se guarda junto a este archivo (en backend/)
DB_PATH = Path(__file__).parent / "curexpress.db"


def get_connection():
    """Abre una conexión a la base de datos.

    row_factory hace que podamos leer las columnas por nombre
    (fila["latitude"]) en lugar de por posición.
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    """Crea las tablas si todavía no existen."""
    conn = get_connection()
    try:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS tracking_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                started_at TEXT NOT NULL,
                ended_at TEXT,
                is_active INTEGER NOT NULL DEFAULT 1
            );

            CREATE TABLE IF NOT EXISTS locations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                accuracy REAL,
                speed REAL,
                device_timestamp TEXT,
                received_at TEXT NOT NULL,
                FOREIGN KEY (session_id) REFERENCES tracking_sessions (id)
            );

            CREATE INDEX IF NOT EXISTS idx_locations_session
                ON locations (session_id, id);
            """
        )
        conn.commit()
    finally:
        conn.close()


if __name__ == "__main__":
    # Prueba rápida: se ejecuta solo cuando corres "python database.py"
    init_db()
    conn = get_connection()
    try:
        tablas = conn.execute(
            "SELECT name FROM sqlite_master "
            "WHERE type = 'table' AND name NOT LIKE 'sqlite_%' "
            "ORDER BY name"
        ).fetchall()
        print("Base de datos:", DB_PATH)
        print("Tablas:", [t["name"] for t in tablas])
    finally:
        conn.close()