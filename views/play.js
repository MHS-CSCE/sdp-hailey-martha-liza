/**
 * generates HTML for displaying the quiz questions with their images and options
 * creates the head and form opening part of the HTML
 * iterates over the questions array to create HTML for each question
 * embeds the images and options for each question
 * appends the closing form and body tags
 * returns the complete HTML string
 *
 * @param {Array} questions - an array of question objects
 * @param {Object} base64ImgMap - a map of question IDs to their Base64 encoded images and MIME types
 * @param {string} accessCode - the access code for the quiz
 * @param {string} user - the name of the user taking the quiz
 * @returns {string} - the complete HTML string for the quiz page
 */
const getPlayHTML = (questions, base64ImgMap, accessCode, user) => {
  //create a string template of HTML(used instead of form)
	const headHTML = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="style.css" rel="stylesheet" type="text/css"/>
    <title></title>
  </head>
  <body>
    <form id="questions">`;

	const bottomHTML = `
            <button type="submit" class="smallButton2">Submit</button>
    </form>
      <script src="submitQuiz.js"></script>
  </body>
</html>;`;

	let questionsComponents = questions.map((question) => {
		let img = '';
		if (base64ImgMap[question.id]) {
			const { mimeType, imgBase64 } = base64ImgMap[question.id];
			img = `<div id="img"><img src="data:${mimeType};base64,${imgBase64}" alt="Card Image${question.id}" style="width:450px;"></div>`;
		}
    //if image is not uploaded, then return just a template for question title, text, and options
		return `
        <div class="smallBox" id="${question.id}" quiz="${accessCode}" userName="${user}">
            <h1>${question.title}</h1>
            ${img}
            <p>${question.questionText}</p>
            <div class="option-column">
              <input type="radio" name="${question.id}" value="${question.options[0].id}" id="option1" />
              <label for="option1">${question.options[0].min};  ${question.options[0].max};</label><br /><br/>
              <input type="radio" name="${question.id}" value="${question.options[1].id}" id="option2" />
              <label for="option2">${question.options[1].min};  ${question.options[1].max};</label><br /><br/>
            </div>
            <div class="option-column">
              <input type="radio" name="${question.id}" value="${question.options[2].id}" id="option3" />
              <label for="option3">${question.options[2].min};  ${question.options[2].max};</label><br /><br/>
              <input type="radio" name="${question.id}" value="${question.options[3].id}" id="option4" />
              <label for="option4">${question.options[3].min};  ${question.options[3].max};</label><br/><br/>
            </div>
        </div>`;
	});
  //return the united top and bottom parts
	return headHTML.concat(questionsComponents.join(''), bottomHTML);
};

//export function
module.exports = {
	getPlayHTML,
};