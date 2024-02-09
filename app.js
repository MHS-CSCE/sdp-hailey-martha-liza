const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Connect sqlite3 with the database
const db = new sqlite3.Database('myDatabase.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle form submission
app.post('/enter', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.send('Error: failed to login');
    }
    console.log('Data inserted successfully');
    res.send('Login is successful!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
