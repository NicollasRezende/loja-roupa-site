// controllers/usersController.js
const pool = require('../db');

// Criar novo usuário
const createUser = async (req, res) => {
    const { name, email, password_hash, role } = req.body;
    console.log("Requisição recebida:", req.body); // Log para verificar a requisição
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, password_hash, role]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};


// Ler todos os usuários
const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// Ler usuário por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

// Atualizar usuário
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password_hash, role } = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, password_hash = $3, role = $4 WHERE id = $5 RETURNING *',
            [name, email, password_hash, role, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

// Deletar usuário
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
