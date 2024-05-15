//import functions from different files
const { getRandomString } = require("../helpers/index");
const { getQuizListHTML } = require("../views/quizList");
const {
  createNewQuiz,
  createNewQuestion,
  createNewOption,
  getAll,
} = require("../db/queries");

/**
* creates new quiz that contains questions and options
* for each question iterates over the provided options and creates new options in the database
* sends a success response with the access code
@param {Object} req - The HTTP request object.
@param {Object} res - The HTTP response object.
*/
const createQuiz = async (req, res) => {
  const accessCode = await getRandomString();
  const quizId = await createNewQuiz(accessCode);
  // console.log(JSON.stringify(req.body));
  // console.log(req.files);
//create a complete quiz
  for (let i = 1; i < req.body.questions.length; i++) {
    //console.log(JSON.stringify(req.body));
    const { title, description, options, imgName } = req.body.questions[i];
    const questionId = await createNewQuestion(
      title,
      description,
      quizId,
      imgName,
    );
//a loop used to create new options with min and max values, check for correctness
    for (let i = 0; i < options.length; i++) {
      const { min, max, correct } = options[i];
      await createNewOption(min, max, questionId, correct === "on");
    }
  }
  return res.send(`Question created successfully! Access code: ${accessCode}`);
};

/**
* fetches all quizzes from db
* generates an HTML list of quizzes
* sends the generated HTML as the response
@param {Object} req - The HTTP request object.
@param {Object} res - The HTTP response object.
*/
const getQuizzesList = async (req, res) => {
  const quizzes = await getAll("quizzes");
  const quizzListHTML = getQuizListHTML(quizzes);
  res.set("Content-Type", "text/html");
  res.send(quizzListHTML);
};

//export functions
module.exports = {
  createQuiz,
  getQuizzesList,
};