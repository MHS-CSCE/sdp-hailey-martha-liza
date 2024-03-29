const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer  = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Connect sqlite3 with the database
const db = new sqlite3.Database('myDatabase.db');
app.use(express.urlencoded({ extended: true }));

// Create the "questions" table if it doesn't exist
// Create the "options" table if it doesn't exist
// Create the "options" table if it doesn't exist
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Save uploaded files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // Rename files to avoid conflicts
  }
})

const upload = multer({ storage: storage });

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS quizes(id INTEGER PRIMARY KEY, title TEXT, accessCode UNIQUE)');
  db.run('CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, optionText TEXT, imagePath TEXT)'); //later end isCorrect boolean INTEGER
  db.run('CREATE TABLE IF NOT EXISTS options (id INTEGER PRIMARY KEY, questionId INTEGER, optionText TEXT, isCorrect INTEGER, FOREIGN KEY(questionId) REFERENCES questions(id))');
  db.run('CREATE TABLE IF NOT EXISTS images(id INTEGER PRIMARY KEY, url TEXT');
})

// Serve the HTML login file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/teacher.html');
  res.sendFile(__dirname + '/student.html');
});

// Handle form submission
app.post('/signup', async (req, res) => {
  const email = req.body.email;
  // const password = req.body.password;
  // generate salt
  const salt = await bcrypt.genSalt();
  // hash password using salt
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
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

app.post('/createQuestion', upload.single('image'), (req,res) => {
  const { questionText, option1, option2, option3, option4 } = req.body;
  // Insert the question into the database
  db.run('INSERT INTO questions (questionText) VALUES (?)', [questionText], function(err) {
    if (err) {
      console.error('Error inserting question:', err.message);
      res.status(400).send("Error inserting question: " + err.message);
    }

    const questionId = this.lastID;

    // Insert the options into the database
    db.run('INSERT INTO options (questionId, text, isCorrect) VALUES (?, ?, ?)', [questionId, option1, 1]); // Assuming option1 is correct
    db.run('INSERT INTO options (questionId, text, isCorrect) VALUES (?, ?, ?)', [questionId, option2, 0]); // Assuming option2 is incorrect
    db.run('INSERT INTO options (questionId, text, isCorrect) VALUES (?, ?, ?)', [questionId, option3, 0]); // Assuming option3 is incorrect
    db.run('INSERT INTO options (questionId, text, isCorrect) VALUES (?, ?, ?)', [questionId, option4, 0]); // Assuming option4 is incorrect

    return res.send('Question created successfully!');
  });
  const imageUrl = req.file.location;
  
    // Store the image URL in the 'images' table
    db.run('INSERT INTO images (url) VALUES (?)', [imageUrl], (err) => {
      if (err) {
        console.error('Error inserting image URL:', err.message);
        return res.status(500).send('Error inserting image URL');
      }
  
      return res.send('Image uploaded and URL stored successfully!');
    });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
