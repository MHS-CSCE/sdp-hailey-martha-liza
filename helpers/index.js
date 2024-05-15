//from packages import path and fs for handling images
const path = require("path");
const fs = require("fs");

/**
* randomly generates a unique access code for quizzes
* calculates the length of the code
* returns code as a string
*/
const getRandomString = function () {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 6;
  let str = "";
  for (let i = 0; i < codeLength; i++) {
    //calculates the length that code should be
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return str;
};

/**
* checks if the number of questions match with number of options
* assigns options to corresponding questions
* returns the updated questions array with options mapped to each question
* @param {Array} questions - the array of question objects
* @param {Array} options - the array of options arrays, where each options array corresponds to a question
* @returns {Array} - the updated array of questions with options mapped
* @throws will throw an error if the number of questions does not match with number of options
*/
const mapOptionsToQuestions = (questions, options) => {
  if (questions.length !== options.length) {
    throw new error(
      "Number of options objects to map  does not match with number of questions!",
    );
  }

  questions.forEach((question) => {
    //filter returns elements of array that meet condition in a callback function
    question.options = options.filter((optionObj) =>
      optionObj.every((option) => option.questionId === question.id),
    )[0];
  });
  //console.log(questions);
  return questions;
};

/**
* groups responses by student name, groups by timestamp
* adds each response to an appropriate group of data
* @param {Array} data - the array of response objects to be grouped
* @returns {Object} - the grouped data object
*/
const getGroupedData = (data) => {
  return data.reduce((acc, obj) => {
    const key = obj.studentName;
    if (!acc[key]) {
      acc[key] = { responses: {} };
    }

    //find or create array for this timestamp
    const timestamp = obj.timestamp;
    if (!acc[key].responses[timestamp]) {
      acc[key].responses[timestamp] = { results: [] };
    }

    //add the response to the timestamp group
    acc[key].responses[timestamp].results.push(obj);

    return acc;
  }, {});
};

/**
* includes possible formats of images that can be uploaded
* uses a switch statement to match the file extension to a MIME type
* returns the appropriate MIME type or a default MIME type if no match is found
* @param {string} filePath - the path to the file whose MIME type is to be determined
* @returns {string} - the MIME type corresponding to the file extension
*/
function getMimeType(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  switch (extname) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    //add more cases as needed for other file types
    default:
      return "application/octet-stream"; //default MIME type
  }
}

/**
 * converts image files to Base64 encoding and maps them by question ID
 * constructs the full path to each image.
 * determines the MIME type of each image.
 * reads the image file and converts it to Base64 encoding.
 * maps the Base64 encoded image and its MIME type to the corresponding question ID.
 *
 * @param {Array} imgNameArr - an array of objects containing question IDs and image names.
 * @returns {Object}- a map where the keys are question IDs and the values are objects containing Base64 encoded images and MIME types.
 */
const getBase64Img = (imgNameArr) => {
  const base64ImgMap = {};
  imgNameArr.forEach((question) => {
    //console.log(question);
    const imagePath = path.join("uploads", question.imgNames);
    const mimeType = getMimeType(imagePath);
    //map the Base64 encoded image and its MIME type to the question id
    base64ImgMap[question.questionId] = {
      ["imgBase64"]: fs.readFileSync(imagePath, { encoding: "base64" }),
      mimeType,
    };
  });
  return base64ImgMap;
};

//export functions
module.exports = {
  getRandomString,
  mapOptionsToQuestions,
  getGroupedData,
  getBase64Img,
};