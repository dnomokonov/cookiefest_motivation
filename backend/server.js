const express = require('express');
const bodyparser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
require('express-async-errors');

// Создаём экземпляр приложения express
const app = express();
const port = 3000;

// Пул для соединения с БД
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '471979',
  port: 5432,
});

// Парсинг в формате JSON
app.use(bodyparser.json());

// CORS
app.use(cors());

// Проверка подключения к БД
pool.connect()
  .then(client => {
    console.log('connected to postgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('connection to postgreSQL failed', err.stack);
    process.exit(1);
  });

// Роут, который возращает строку "hello world!"
app.get('/', (req, res) => {
  res.send('hello world!');
});

// Роут логин
app.post('/login', [
  // Валидация входных данных
  body('username').notEmpty().withMessage('username is required'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Извлекаем данные с запроса
  const { username, password } = req.body;

  try {
    // Находим пользователя в БД с таким же username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    // Проверка, что пользователь существует
    if (!user) {
      return res.status(404).json({
        userMessage: false,
        description: 'user not found',
      });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        passMessage: false,
        description: 'incorrect password',
      });
    }

    // Если все данные верны, то возвращаем успешный ответ
    res.status(200).json({
      success: true,
      nickname: user.username,
      personLog: username,
      idTG: user.telegram_id,
    });
  }
  // Обработка ошибок
  catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'internal server error',
      description: e.message,
    });
  }
});

// Роут регистрации
app.post('/signup', [
  // Валидация данных
  body('name').notEmpty().withMessage('name is required'),
  body('surname').notEmpty().withMessage('surname is required'),
  body('patronymic').notEmpty().withMessage('patronymic is required'),
  body('username').notEmpty().withMessage('username is required'),
  body('email').isEmail().withMessage('invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  // Проверка ошибок валидации данных
  console.log('Received signup request:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  // Извлекаем данные пользователя
  const { name, surname, patronymic, username, email, password } = req.body;

  try {
    // Проверка существования email
    console.log('Checking if email exists...');
    const emailResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailResult.rows.length > 0) {
      console.log('Email is already in use');
      return res.status(400).json({
        emailMessage: false,
        description: 'email is already in use',
      });
    }

    // Проверка существования пользователя
    console.log('Checking if username exists...');
    const usernameResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (usernameResult.rows.length > 0) {
      console.log('Username is already taken');
      return res.status(400).json({
        usernameMessage: false,
        description: 'username is already taken',
      });
    }

    // Хэширование пароля
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Добавление пользователя в БД
    console.log('Inserting new user...');
    const result = await pool.query(
      'INSERT INTO users (name, surname, patronymic, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, surname, patronymic, username, email, hashedPassword]
    );

    // Возвращаем успешный ответ
    console.log('User successfully created:', result.rows[0]);
    res.status(201).json({
      success: true,
      nickname: result.rows[0].username,
    });
  } catch (e) {
    console.error('Error during signup:', e);
    res.status(500).json({
      error: 'internal server error',
      description: e.message,
    });
  }
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
