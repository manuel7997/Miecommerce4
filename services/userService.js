const db = require('../db/database');

// 🔒 Nunca exponemos password_hash en las respuestas de la API
const mapUser = (row) => {
    if (!row) return null;
    const { password_hash, ...safeUser } = row;
    return safeUser;
};

// 📋 Todos los usuarios
const getAllUsers = () => {
    return db.prepare('SELECT * FROM users').all().map(mapUser);
};

// 📦 Usuario por ID
const getUserById = (id) => {
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    return mapUser(row);
};

// ➕ Crear usuario
// ⚠️ password_hash temporal — reemplazar por hasheo real cuando se implemente autenticación
const createUser = (data) => {
    const stmt = db.prepare(`
        INSERT INTO users (name, email, password_hash)
        VALUES (@name, @email, @password_hash)
    `);
    const result = stmt.run({
        name: data.name,
        email: data.email,
        password_hash: 'changeme123'
    });
    return getUserById(result.lastInsertRowid);
};

// ✏️ Actualizar usuario (solo nombre y email, nunca password)
const updateUser = (id, data) => {
    db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')
      .run(data.name, data.email, id);
    return getUserById(id);
};

// ❌ Eliminar usuario
const deleteUser = (id) => {
    return db.prepare('DELETE FROM users WHERE id = ?').run(id);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
