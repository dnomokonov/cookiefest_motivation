const express = require('express');
const bodyparser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
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

app.use(bodyparser.json());

app.use(cors());

pool.connect()
  .then(client => {
    console.log('connected to postgresql');
    client.release();
  })
  .catch(err => {
    console.error('connection to postgresql failed', err.stack);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.post('/login', [
  body('email').isEmail().withMessage('invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long')
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
        description: 'user not found',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        passMessage: false,
        description: 'incorrect password',
      });
    }

    res.status(200).json({
      success: true,
      nickname: user.username,
      personLog: email,
      idTG: user.telegram_id,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'internal server error',
      description: e.message,
    });
  }
});

app.post('/signup', [
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
  console.log('Received signup request:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, surname, patronymic, username, email, password } = req.body;

  try {
    console.log('Checking if email exists...');
    const emailResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailResult.rows.length > 0) {
      console.log('Email is already in use');
      return res.status(400).json({
        emailMessage: false,
        description: 'email is already in use',
      });
    }

    console.log('Checking if username exists...');
    const usernameResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (usernameResult.rows.length > 0) {
      console.log('Username is already taken');
      return res.status(400).json({
        usernameMessage: false,
        description: 'username is already taken',
      });
    }

    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Inserting new user...');
    const result = await pool.query(
      'INSERT INTO users (name, surname, patronymic, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, surname, patronymic, username, email, hashedPassword]
    );

    console.log('User successfully registered:', result.rows[0]);
    res.status(201).json({
      success: true,
      message: 'user successfully registered',
      user: result.rows[0],
    });

  } catch (e) {
    console.error('Error in /signup route:', e);
    res.status(500).json({
      error: 'internal server error',
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
      error: 'internal server error',
      description: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`start server on http://localhost:${port}`);
});
