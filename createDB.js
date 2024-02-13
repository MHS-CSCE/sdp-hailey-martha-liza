const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Connect sqlite3 with the database
const db = new sqlite3.Database('myDatabase.db');
app.use(express.urlencoded({ extended: true }));

// Serve the HTML login file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/teacher.html');
});

// Handle form submission
app.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
    if (err) {
      return res.send('Error: failed to sign');
    }
    res.send('Sign up is successful!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
