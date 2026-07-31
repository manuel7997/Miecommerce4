const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../services/userService');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 📋 GET /api/users
const getAll = (req, res) => {
    try {
        const users = getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// 📦 GET /api/users/:id
const getById = (req, res) => {
    try {
        const user = getUserById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// ➕ POST /api/users
const create = (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'El nombre es obligatorio' });
        }
        if (!email || !EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: 'El email no es válido' });
        }

        const newUser = createUser({ name: name.trim(), email: email.trim() });
        res.status(201).json(newUser);
    } catch (err) {
        if (err.message && err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Ese email ya está registrado' });
        }
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// ✏️ PUT /api/users/:id
const update = (req, res) => {
    try {
        const existing = getUserById(req.userId);

        if (!existing) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const { name, email } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'El nombre es obligatorio' });
        }
        if (!email || !EMAIL_REGEX.test(email)) {
            return res.status(400).json({ error: 'El email no es válido' });
        }

        const updated = updateUser(req.userId, { name: name.trim(), email: email.trim() });
        res.status(200).json(updated);
    } catch (err) {
        if (err.message && err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Ese email ya está registrado' });
        }
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// ❌ DELETE /api/users/:id
const remove = (req, res) => {
    try {
        const existing = getUserById(req.userId);

        if (!existing) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        deleteUser(req.userId);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

module.exports = { getAll, getById, create, update, remove };
