//NOTE: to test this file, make sure you have npm sqlite3 and npm express initialized in terminal
//To initialize npm: npm init
//To initialize sqlite: npm i sqlite3
//To intialize express: npm i express

//initialize express and sqlite
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

//transfer express to the variable app and create a port
const app = express();
const port = 3000;

//connect sqlite3 with the database - it automatically will create a file called myDatabase.db
const db = new sqlite3.Database('myDatabase.db', (err) => {
  if (err) {
    //print a message if error occured
    console.error('Database connection error:', err.message);
  } else {
    //otherwise notify that file is connected to myDatabase.db
    console.log('Connected to the database');
  }
});

//parsing incoming requests with url
app.use(express.urlencoded({ extended: true }));

//serve static files from the current directory
app.use(express.static(__dirname));

//handle form submission
app.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //inserting input email and password into myDatabase.db table
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
    if (err) {
      //notify in console if error occured
      console.error('Error inserting data:', err.message);
      //after clicking button sign up, the message will appear saying about error
      return res.send('Error: failed to sign up');
    }
    //notify if input data is in database table, sign up is successfull
    console.log('Data inserted successfully');
    res.send('Sign up is successful!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
