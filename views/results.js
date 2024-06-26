/**
 * generates HTML for displaying quiz results in a table format
 * creates the head part of the HTML including the document type, meta tags, some styling present
 * generates table columns for each question based on the question count
 * iterates over the data to generate HTML for each row in the table
 * appends the closing table, body, and HTML tags
 * returns the complete HTML string
 *
 * @param {Object} data - the grouped data containing quiz results
 * @param {number} questionCount - the total number of questions in the quiz
 * @returns {string} - the complete HTML string for the quiz results table
 */
const getResultsTableHTML = (data, questionCount) => {
  let columns = [];
  for (let i = 0; i < questionCount; i++) {
    //returns the new length of array columns
    columns.push(
      `<th scope="col" style="border: 1px solid; border-color: black;">Question #${i + 1}</th>`,
    );
  }
  columns = columns.join("");
//top part of html
  const headHTML = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="style.css" rel="stylesheet" type="text/css"/>
    <title>Quizz results</title>
  </head>
  <body>
    <table id="result-table" style="width: 80%;">
      <thead>
        <tr>
          <th scope="col" style="border: 1px solid; border-color: black;">Student name</th>
          <th scope="col" style="border: 1px solid; border-color: black;">Time</th>
          ${columns}
          <th scope="col" style="border: 1px solid; border-color: black;">Grade</th>
    `;

  const middleHTML = [];
//generate HTML for the middle part of the table(rows)
  for (const key in data) {
    const middleRow = [];
    for (const key2 in data[key]) {
      for (const key3 in data[key][key2]) {
        middleRow.push(
          `<tr scope="row"><td style="border: 1px solid; border-color: black; width: 20%">${key}</td><td style="border: 1px solid; border-color: black; width: 15%">${key3}</td>`,
        );
        for (let i = 0; i < data[key][key2][key3].results.length; i++) {
          middleRow.push(
            `<td style="border: 1px solid; border-color: black; text-align: center; width: 12%">${data[key][key2][key3].results[i].isCorrect}</td>`,
          );
        }
        middleRow.push(
          `<td style="border: 1px solid; border-color: black; text-align: center; width: 10%">${data[key][key2][key3].grade} %</td>`,
        );
      }
    }
    middleHTML.push(middleRow.join(""));
  }
//bottom part
  const bottomHTML = `
      </tr>
        </thead>
            </table>
    </body>
</html>`;
//unite top and bottom parts
  const html = headHTML.concat(middleHTML.join(""), bottomHTML);
  return html;
};

//export function 
module.exports = {
  getResultsTableHTML,
};