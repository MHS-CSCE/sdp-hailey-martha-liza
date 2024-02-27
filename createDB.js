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

app.post('/login', (req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  //this is a syntax of SQL, it means that it will be getting info from the existed table users
  db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err) => {
    if (err) {
      //if error occured, then something does not match
      console.error('Data do not coincide', err.message);
      return res.send('Error: failed to log in');
    }
    console.log('Login successful!');
    return res.send('Log in is successful!');

  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
