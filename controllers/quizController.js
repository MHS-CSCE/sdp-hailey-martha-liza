const { getRandomString } = require("../helpers/index");
const {
  createNewQuiz,
  createNewQuestion,
  createNewOption,
} = require("../db/queries");

const createQuiz = async (req, res) => {
  console.log(JSON.stringify(req.body));
  const accessCode = await getRandomString();
  const quizId = await createNewQuiz(accessCode);

  for (let i = 0; i < req.body.questions.length; i++) {
    const { title, description, options } = req.body.questions[i];
    const questionId = await createNewQuestion(title, description, quizId);
    console.log(questionId, " QuestionId before creating new options");

    for (const option of options) {
      const { min, max, correct } = option;
      console.log(questionId, " during creating options");
      await createNewOption(min, max, questionId, correct === "on");
    }
  }
  return res.send(`Question created successfully! Access code: ${accessCode}`);
};

module.exports = {
  createQuiz,
};