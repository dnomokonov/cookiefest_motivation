const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Start server on http://localhost:${port}`)
})

// Маршрут для входа (/login)
app.post('/login', (req, res) => {
    const { login, password } = req.body;

    if (login === 'admin' && password === 'password123') {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
