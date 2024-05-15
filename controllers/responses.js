//import functions from different files
const {
  getResponsesByAccessCode,
  getCountOfQuestions,
  getQuizIdByCode,
} = require("../db/queries");
const { getGroupedData } = require("../helpers/index");
const { getResultsTableHTML } = require("../views/results");

/**
* queries access code from db
* calculates the overall grade for student
* gets data from quiz id
@param {Object} req - The HTTP request object.
@param {Object} res - The HTTP response object.
*/
const getResponsesByQuizId = async (req, res) => {
  const accessCode = req.query.code;
  try {
    //fetch responses from the database using the access code
    const responses = await getResponsesByAccessCode(accessCode);
    //group the fetched responses for easier processing
    const groupedData = getGroupedData(responses);
    //retrieve the quiz ID using the access code
    const quizId = await getQuizIdByCode(accessCode);
     //get the count of questions in the quiz
    const { questionCount } = await getCountOfQuestions(quizId);

    for (const key in groupedData) {
      for (const key2 in groupedData[key].responses) {
        //calculate the count of correct answers for the current response
        const correctAnswersCount = groupedData[key].responses[
          key2
        ].results.reduce((sum, currentQuestion) => {
          if (currentQuestion.isCorrect === 1) {
            return sum + 1;
          } else {
            return sum;
          }
        }, 0);
        //assign a grade to the current response based on the count of correct answers
        for (const key3 in groupedData[key].responses[key2]["results"]) {
          groupedData[key].responses[key2]["grade"] = correctAnswersCount
            ? Math.ceil((correctAnswersCount / questionCount) * 100)
            : 0;
        }
      }
    }
//displays results in a table
    const html = getResultsTableHTML(groupedData, questionCount);
    res.set("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error("ERROR ON GETTING RESPONSES\n", err);
  }
};

//export functions
module.exports = {
  getResponsesByQuizId,
};