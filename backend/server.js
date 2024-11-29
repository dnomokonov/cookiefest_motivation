const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('express-async-errors');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '471979',
  port: 5432,
});

app.use(bodyParser.json()); // для парсинга JSON в теле запроса

// Проверка соединения с базой данных при запуске сервера
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('Connection to PostgreSQL failed', err.stack);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      res.status(404).json({
        userMessage: false,
        description: 'User not found',
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        passMessage: false,
        description: 'Incorrect password',
      });
      return;
    }

    res.status(200).json({
      success: true,
      nickname: user.username,
      personLog: email,
      idTg: user.telegram_id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Internal server error',
      description: e.message,
    });
  }
});

app.get('/logout', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      personLog: '',
      routerTag: true,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: 'Bad request',
      description: e.message,
    });
  }
});

// Обработчик маршрута для выгрузки всех данных из таблицы users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Internal server error',
      description: e.message,
    });
  }
});

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    description: err.message,
  });
});

app.listen(port, () => {
  console.log(`Start server on http://localhost:${port}`);
});
