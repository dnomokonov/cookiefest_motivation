const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const emailExistence = require('email-existence'); // Используем email-existence для проверки email
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

app.use(bodyParser.json());

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

app.post('/login', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        userMessage: false,
        description: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        passMessage: false,
        description: 'Incorrect password',
      });
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

app.post('/signin', [
  body('name').notEmpty().withMessage('Name is required'),
  body('surname').notEmpty().withMessage('Surname is required'),
  body('patronymic').notEmpty().withMessage('Patronymic is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, surname, patronymic, username, email, password } = req.body;

  try {
    // Проверка, существует ли email
    emailExistence.check(email, async (error, response) => {
      if (error || !response) {
        return res.status(400).json({
          emailMessage: false,
          description: 'Email address is not valid or doesn’t exist',
        });
      }

      // Проверяем, занят ли email в базе данных
      const emailResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (emailResult.rows.length > 0) {
        return res.status(400).json({
          emailMessage: false,
          description: 'Email is already in use',
        });
      }

      // Проверяем, занят ли username
      const usernameResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (usernameResult.rows.length > 0) {
        return res.status(400).json({
          usernameMessage: false,
          description: 'Username is already taken',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        'INSERT INTO users (name, surname, patronymic, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, surname, patronymic, username, email, hashedPassword]
      );

      res.status(201).json({
        success: true,
        message: 'User successfully registered',
        user: result.rows[0],
      });
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'Internal server error',
      description: e.message,
    });
  }
});

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

app.listen(port, () => {
  console.log(`Start server on http://localhost:${port}`);
});
