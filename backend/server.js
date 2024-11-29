const express = require('express');
const bodyparser = require('body-parser');
const { pool } = require('pg');
const bcrypt = require('bcryptjs');
const { body, validationresult } = require('express-validator');
const emailexistence = require('email-existence'); // используем email-existence для проверки email
require('express-async-errors');

const app = express();
const port = 3000;

const pool = new pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '471979',
  port: 5432,
});

app.use(bodyparser.json());

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
  body('email').isemail().withmessage('invalid email format'),
  body('password').islength({ min: 6 }).withmessage('password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationresult(req);
  if (!errors.isempty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const result = await pool.query('select * from users where email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        usermessage: false,
        description: 'user not found',
      });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).json({
        passmessage: false,
        description: 'incorrect password',
      });
    }

    res.status(200).json({
      success: true,
      nickname: user.username,
      personlog: email,
      idtg: user.telegram_id,
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
  body('name').notempty().withmessage('name is required'),
  body('surname').notempty().withmessage('surname is required'),
  body('patronymic').notempty().withmessage('patronymic is required'),
  body('username').notempty().withmessage('username is required'),
  body('email').isemail().withmessage('invalid email format'),
  body('password').islength({ min: 6 }).withmessage('password must be at least 6 characters long'),
  body('confirmpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new error('passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationresult(req);
  if (!errors.isempty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, surname, patronymic, username, email, password } = req.body;

  try {
    // проверка, существует ли email
    emailexistence.check(email, async (error, response) => {
      if (error || !response) {
        return res.status(400).json({
          emailmessage: false,
          description: 'email address is not valid or doesn’t exist',
        });
      }

      // проверяем, занят ли email в базе данных
      const emailresult = await pool.query('select * from users where email = $1', [email]);
      if (emailresult.rows.length > 0) {
        return res.status(400).json({
          emailmessage: false,
          description: 'email is already in use',
        });
      }

      // проверяем, занят ли username
      const usernameresult = await pool.query('select * from users where username = $1', [username]);
      if (usernameresult.rows.length > 0) {
        return res.status(400).json({
          usernamemessage: false,
          description: 'username is already taken',
        });
      }

      const hashedpassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        'insert into users (name, surname, patronymic, username, email, password) values ($1, $2, $3, $4, $5, $6) returning *',
        [name, surname, patronymic, username, email, hashedpassword]
      );

      res.status(201).json({
        success: true,
        message: 'user successfully registered',
        user: result.rows[0],
      });
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: 'internal server error',
      description: e.message,
    });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('select * from users');
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
