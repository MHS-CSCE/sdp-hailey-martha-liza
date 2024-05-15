/**
 * generates HTML for displaying a list of quizzes with their access codes as clickable links
 * creates the head part of the HTML including the doctype, head section with meta tags, and link to a CSS file
 * iterates over the quiz list array to generate HTML for each quiz
 * generates HTML for each quiz as a list item with a clickable link to view responses
 * appends the closing body and HTML tags
 * returns the complete HTML string
 *
 * @param {Array} quizList - an array of quiz objects
 * @returns {string} - the complete HTML string for the quiz list page
 */
const getQuizListHTML = (quizList) => {
  //create a top template
  const headHTML = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="style.css" rel="stylesheet" type="text/css"/>
    <title>List of Quizzes</title>
  </head>
  <body>
    <ul class"quiz-list">`;

  const middleHtml = quizList.map((quiz) => {
    //append the access code here as lists, they basically work as links
    return `<li class="list-code" id="${quiz.id}"> <a href="http://localhost:3000/responses/?code=${quiz.accessCode}">${quiz.accessCode}</a></li>`;
  });

  const bottomHTML = `
    </ul>
    </body>
</html>;`;
//unite top and bottom parts
  return headHTML.concat(middleHtml.join(""), bottomHTML);
};

//export function
module.exports = {
  getQuizListHTML,
};