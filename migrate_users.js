const db = require('./db/database');
 
console.log('[Migrate Users] Actualizando tabla users...');

db.exec(`
    DROP TABLE IF EXISTS users;
 
    CREATE TABLE users (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        name          TEXT    NOT NULL,
        email         TEXT    NOT NULL UNIQUE,
        password_hash TEXT    NOT NULL,
        created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );
`);
 
console.log('[Migrate Users] ✅ Tabla users lista para el Sprint 4.');