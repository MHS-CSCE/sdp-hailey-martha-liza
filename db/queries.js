//import db from index.js
const { db } = require("./index");

/**
 * retrieves the last inserted ID from a specified table
 *
 * @param {string} tableName  - the name of the table
 * @returns {Promise<number>} - the last inserted ID
 */
const getLastInsertedId = async (tableName) => {
  return new Promise(async (resolve, reject) => {
    await db.get(
      `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`,
      async (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row.id);
      },
    );
  });
};

/**
 * creates a new quiz with the provided access code
 *
 * @param {string} accessCode - the access code for the quiz
 * @returns {Promise<number>} - the ID of the newly created quiz
 */
const createNewQuiz = async (accessCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await db.prepare(
        `INSERT INTO quizzes (accessCode) VALUES (?)`,
      );
      await query.run(accessCode);
      resolve(await getLastInsertedId("quizzes"));
    } catch (err) {
      console.error("ERROR ON INSERTING A NEW QUIZ\n", err);
      reject(err);
    }
  });
};

/**
 * creates a new question for a quiz
 *
 * @param {string} title - the title of the question
 * @param {string} description - the description of the question
 * @param {number} quizId - the ID of the quiz
 * @param {string} imageName - the name of the associated image
 * @returns {Promise<number>} - the ID of the newly created question
 */
const createNewQuestion = async (title, description, quizId, imageName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await db.prepare(
        `INSERT INTO questions (title, quizID, questionText, imageName) VALUES (?, ?, ?, ?)`,
      );
      await query.run(title, quizId, description, imageName);
      query.finalize();
      resolve(await getLastInsertedId("questions"));
    } catch (err) {
      console.error("ERROR ON INSERTING A QUESTION\n", err);
      reject(err);
    }
  });
};

/**
 * creates a new option for a question
 *
 * @param {number} min - whe minimum value for the option
 * @param {number} max - whe maximum value for the option
 * @param {number} questionId - whe ID of the associated question
 * @param {boolean} isCorrect - whether the option is correct or not
 * @returns {Promise<void>}
 */
const createNewOption = async (min, max, questionId, isCorrect) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await db.prepare(
        "INSERT INTO options (questionId, min, max, isCorrect) VALUES (?, ?, ?, ?)",
      );
      const result = await query.run(questionId, min, max, isCorrect);
      query.finalize();
      resolve(result);
    } catch (err) {
      console.error("ERROR ON INSERTING A NEW OPTION\n", err);
      reject(err);
    }
  });
};

const getQuizBy = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = await db.prepare(
        "SELECT FROM questions (questionId, min, max) VALUES (?, ?, ?)",
      );
      resolve(await query.run(questionId, min, max, isCorrect));
    } catch (err) {
      console.error("ERROR ON INSERTING A NEW OPTION\n", err);
      reject(err);
    }
  });
};

/**
 * retrieves the quiz ID associated with a given access code
 *
 * @param {string} accessCode - the access code for the quiz
 * @returns {Promise<number>} -the ID of the quiz
 */
const getQuizIdByCode = async (accessCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      //prepare the SQL query with placeholder for accessCode
      const query = "SELECT id FROM quizzes WHERE accessCode = ?";

      //execute the query with parameter binding
      db.get(query, [accessCode], (err, row) => {
        if (err) {
          console.error("ERROR ON GETTING QUIZ ID BY ACCESS CODE\n", err);
          reject(err);
        } else {
          //resolve with the row containing the quiz id, or undefined if not found
          resolve(row ? row.id : undefined);
        }
      });
    } catch (err) {
      console.error("ERROR ON GETTING QUIZ ID BY ACCESS CODE\n", err);
      reject(err);
    }
  });
};

/**
 * inserts a value into a specified table and column.
 *
 * @param {string} tableName - the name of the table
 * @param {string} columnName - the name of the column
 * @param {string|number|boolean} value - the value to insert
 * @returns {Promise<void>}
 */
const insertToDb = async (tableName, columName, value) => {
  const query = `INSERT INTO ${tableName} (${columName}) VALUES(?)`;
  try {
    await db.run(query, value);
  } catch (err) {
    console.error("ERROR ON INSERTING TO DB\n", err);
  }
};

/**
 * inserts a quiz result into the database
 *
 * @param {number} quizId - the ID of the quiz
 * @param {number} questionId - the ID of the question
 * @param {string} user - the name of the user
 * @param {number} answeredOption - the ID of the selected option
 * @param {boolean} isCorrect - whether the selected option is correct
 * @returns {Promise<void>}
 */
const insertQuizzResult = async (
  quizId,
  questionId,
  user,
  answeredOption,
  isCorrect,
) => {
  const query = `INSERT INTO responses (quizId, questionId, studentName, answeredOptionId, isCorrect) VALUES(?, ?, ?, ?, ?)`;
  try {
    await db.run(query, [quizId, questionId, user, answeredOption, isCorrect]);
  } catch (err) {
    console.error("ERROR ON INSERTING QUIZ ANSWER TO DB\n", err);
  }
};

/**
 * retrieves rows from a table where the column matches the specified value
 *
 * @param {string} tableName - the name of the table
 * @param {string} columnName - the name of the column
 * @param {string|number|boolean} value - the value to match
 * @returns {Promise<Array>} - the matching rows
 */
const getByWhere = async (tableName, columName, value) => {
  return new Promise(async (resolve, reject) => {
    await db.all(
      `SELECT * FROM ${tableName} WHERE ${columName} = ?`,
      [value],
      (err, rows) => {
        if (err) {
          console.error("Error querying database:", err.message);
          reject(err);
        }

        if (rows) {
          console.log(rows);
          resolve(rows);
        } else {
          reject(false);
        }
      },
    );
  });
};

/**
 * retrieves all rows from a specified table
 *
 * @param {string} tableName - the name of the table
 * @returns {Promise<Array>} - all rows from the table
 */
const getAll = async (tableName) => {
  return new Promise(async (resolve, reject) => {
    await db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) {
        console.error("Error querying database:", err.message);
        reject(err);
      }

      if (rows) {
        resolve(rows);
      } else {
        reject(false);
      }
    });
  });
};

/**
 * retrieves responses for a quiz based on the access code
 *
 * @param {string} accessCode - the access code for the quiz
 * @returns {Promise<Array>} the responses for the quiz
 */
const getResponsesByAccessCode = async (accessCode) => {
  return new Promise(async (resolve, reject) => {
    await db.all(
      `SELECT * FROM responses WHERE quizId = ?`,
      [accessCode],
      (err, rows) => {
        if (err) {
          console.error("Error querying database:", err.message);
          reject(err);
        }

        if (rows) {
          resolve(rows);
        } else {
          reject(false);
        }
      },
    );
  });
};

/**
 * checks if an option is correct based on the option ID
 *
 * @param {number} optionId - the ID of the option
 * @returns {Promise<boolean>} - whether the option is correct
 */
const getIsOptionCorrect = async (optionId) => {
  return new Promise(async (resolve, reject) => {
    await db.get(
      `SELECT isCorrect FROM options WHERE id = ?`,
      [optionId],
      (err, rows) => {
        if (err) {
          console.error("Error querying database:", err.message);
          reject(err);
        }

        if (rows) {
          resolve(rows);
        } else {
          reject(false);
        }
      },
    );
  });
};

/**
 * counts the number of questions in a quiz
 *
 * @param {number} quizId - the ID of the quiz
 * @returns {Promise<number>} - the count of questions
 */
const getCountOfQuestions = async (quizId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = db.prepare(
        `SELECT COUNT(quizID) as questionCount FROM questions WHERE quizID = ?`,
      );
      query.get(quizId, (err, row) => {
        if (err) {
          console.error("ERROR ON DB QUERY COUNT OF QUESTIONS\n", err);
          reject(err);
        } else {
          query.finalize();
          resolve(row);
        }
      });
    } catch (err) {
      console.error("ERROR ON DB QUERY COUNT OF QUESTIONS\n", err);
      reject(err);
    }
  });
};

/**
 * retrieves the image name associated with a question ID
 *
 * @param {number} questionId - the ID of the question
 * @returns {Promise<string>}- the name of the image
 */
const getImgNameByQuestionId = async (questionId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = db.prepare(
        `SELECT id as questionId, imageName FROM questions WHERE id = ?`,
      );
      query.get(questionId, (err, row) => {
        if (err) {
          console.error("ERROR ON DB QUERY IMG NAME\n", err);
          reject(err);
        } else {
          query.finalize();
          resolve(row);
        }
      });
    } catch (err) {
      console.error("ERROR ON DB QUERY IMG NAME\n", err);
      reject(err);
    }
  });
};

//export functions
module.exports = {
  createNewQuiz,
  createNewQuestion,
  createNewOption,
  getQuizIdByCode,
  insertToDb,
  getByWhere,
  insertQuizzResult,
  getAll,
  getResponsesByAccessCode,
  getIsOptionCorrect,
  getCountOfQuestions,
  getImgNameByQuestionId,
};