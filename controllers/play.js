//import functions from different files
const {
  getByWhere,
  getQuizIdByCode,
  getImgNameByQuestionId,
} = require("../db/queries");
const { mapOptionsToQuestions, getBase64Img } = require("../helpers/index");
const { getPlayHTML } = require("../views/play");
const { db } = require("../db/index");

/**
* asynchronous function to handle the quiz play request
* retrieves the quiz ID based on the provided code
* fetches all questions associated with the quiz ID
* fetches image names associated with each question
* converts image names to base64 format
* fetches options for each question
* maps options to their respective questions
* generates HTML for the quiz and sends it as a response
@param {Object} req - The HTTP request object.
@param {Object} res - The HTTP response object.
*/
const playQuizz = async (req, res) => {
  const { code, name } = req.body;
//call the function from quieries file
  const quizId = await getQuizIdByCode(code);
  if (!quizId) {
    res.send("Access code is not valid. Please enter a valid code.");
  }
  const questions = await getByWhere("questions", "quizID", quizId);

//fetch image names associated with each question
  const imgNames = await Promise.all(
    questions.map(async (question) => {
      const dbRes = await getImgNameByQuestionId(question.id);
      return { ["questionId"]: dbRes.questionId, imgNames: dbRes.imageName };
    }),
  );
  //convert image names to base64 format by calling a function
  const base64ImgMap = await getBase64Img(imgNames);

  console.log(questions);
  //fetch options for each question
  const options = await Promise.all(
    questions.map(async (question) => {
      return await getByWhere("options", "questionId", question.id);
    }),
  );
  console.log("after Promise all options: \n", options);

  //map options to respective questions
  const mappedQuestions = mapOptionsToQuestions(questions, options);
  //console.log('Mapped: \n', mapOptionsToQuestions);
  console.log(mappedQuestions);
  const html = await getPlayHTML(questions, base64ImgMap, code, name);
  //console.log(html);
  res.set("Content-Type", "text/html");
  res.send(Buffer.from(html));
};

//export the function
module.exports = { playQuizz };