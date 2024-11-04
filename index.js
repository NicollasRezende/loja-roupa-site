// index.js
require('dotenv').config(); // Carrega variáveis de ambiente primeiro
const express = require('express');
const pool = require('./db');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
app.use(express.json()); // Middleware para parsing de JSON
app.use('/users', usersRoutes); // Rotas para CRUD de usuários

const PORT = process.env.PORT || 5000;

// Função para testar a conexão com o banco
const testDbConnection = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Conexão com o banco de dados estabelecida:', result.rows[0].now);
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Encerra o servidor se a conexão falhar
    }
};

// Testando a conexão com o banco de dados ao iniciar o servidor
app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    await testDbConnection(); // Testa a conexão após iniciar o servidor
});
