const Database = require('better-sqlite3');
const path     = require('path');
const fs       = require('fs');

const DB_PATH     = path.join(__dirname, 'ecommerce.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

// 🔌 Crear (o abrir) la base de datos
const db = new Database(DB_PATH);

// ⚡ WAL mode: mejor rendimiento en lecturas concurrentes
db.pragma('journal_mode = WAL');

// 🏗️ Ejecutar schema solo si las tablas no existen aún
const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
db.exec(schema);

console.log('[DB] Conexión establecida →', DB_PATH);

module.exports = db;