//import functions from different files
const { insertQuizzResult, getIsOptionCorrect } = require("../db/queries");

/**
* gets an index of requesting body for each quiz, question, student and the answered option
* calls the function for validation of answered option
* calls the function to insert data into responses.sql(db)
@param {Object} req - The HTTP request object.
@param {Object} res - The HTTP response object.
*/
const submitAnswers = async (req, res) => {
  try {
    //get data using indexes, check if answered option is correct
    for (let i = 0; i < req.body.length; i++) {
      const { quizId, questionId, name, answeredOption } = req.body[i];
      const { isCorrect } = await getIsOptionCorrect(answeredOption);
      //processing data into db table responses
      await insertQuizzResult(
        quizId,
        questionId,
        name,
        answeredOption,
        isCorrect,
      );
    }
  } catch (err) {
    console.error("ERROR ON SUBMITTING RESPONSE\n", err);
  }
//if everything is good, redirect user on the main page
  res.redirect("http://localhost:3000/");
};

//export functions
module.exports = {
  submitAnswers,
};