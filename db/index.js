//from packages, typed in terminal "npm i sqlite3"
//initialize sqlite3
const sqlite3 = require("sqlite3").verbose();

//when run the file, automatically creates a db file that is connected to createDB.js
const db = new sqlite3.Database("myDatabase.db", (err) => {
  if (err) {
    //print a message if error occured
    console.error("Database connection error:", err.message);
  } else {
    //otherwise notify that file is connected to myDatabase.db
    console.log("Connected to the database");
  }
});

//export db
module.exports = {
  db,
};