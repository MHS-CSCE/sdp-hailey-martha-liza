//NOTE: to test this file, make sure you have npm sqlite3 and npm express initialized in terminal
//To initialize npm: npm init
//To initialize sqlite: npm i sqlite3
//To intialize express: npm i express

//create and initialize express and sqlite
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

//transfer express to the variable app and create a port
const app = express();
const port = 3000;

//connect sqlite3 with the database
const db = new sqlite3.Database('myDatabase.db');
app.use(express.urlencoded({ extended: true }));

//serve the HTML login file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/teacher.html');
});

//handle form submission
app.post('/signup', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //run database and sending email and password as values
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err) => {
    if (err) {
      return res.send('Error: failed to sign');
    }
    //send response if there is no error occured
    res.send('Sign up is successful!');
  });
});

//start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
