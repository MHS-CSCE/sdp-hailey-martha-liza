# Physics Fun! A question generator project
A question generator is a software development project used to provide convenience and more opportunities for teachers to dynamically create quizzes, and fun for students.

## Features
The project is developed using several programming languages and skills: Express Node Js: primarily Asynchronous JS was used; HTML: developing web pages; CSS: styling for web pages; and SQLite for creating database.
    - For teachers: contains sign in and login opportunites; special page to create questions and generate an unique access code, and view statistics of students.
    - For students: play button; requires entering name and an access code given by teacher; view questions and have fun! $ possible options of min and max ranges are provided. The task is to try to choose a correct option.

## Downloading packages and running the program
Before running the program, you need to make sure that you have node js installed on your computer. Here are few steps to follow:
  1. Go to https://nodejs.org/en/download . You can download node js from this website.
  2. Then initialize node.js set up on your computer by clicking "next". It wil ask for your agreement, a custom location, the feature you'd like to install and automatically install modules(agree).
  3. After installation, click Window + R --> CMD --> type "node-v". You can do the same with "npm-v", since it is in modules of node.
  4. Go to Visual Studio Code, download "Node Extension Pack"(by Wade Anderson).
  5. You can now initialize npm. In terminal, type "npm init", and follow all the steps. After you type "npm install", you will be downloading all packages from our code.
  6. Finally, to run the program, you can either press Ctrl + F5 and choose to run with Node Js, or type "npm start" in terminal. 
  7. In addition, if you'd like to view the functionality of database, you'll have to install SQLite extension(by alexcvzz), and SQLite Viewer(by Florian Klampfer). You could also install SQLTolls SQLite(by Matheus Teixeirs).
As you decide to download the code and package-lock.json from our code space, make sure you have all necessary folders that should be present(for example, uploads for images). And if you see that you do not have "myDatabase.db" file, you have to run "createDB.js"(in db folder) file first to initialize database. 

## Possible bugs and issues
Although the project is pretty much functional, there may be some bugs sometimes with statistics and creating questions. When you create too many questions, the data will be processing into database for a long time, and there is a chance that some features(ids) for db tables can mix up. It may cause issues with how questions will be displayed to students, as well as to their statistics. There may be an issue with handling images while creating questions: for almost every time, it will be desirable to upload an image for every question. Otherwise, the website may crash due to overload. 

## Support and Contact information
If you are have any questions, or need a support or clarification, you can contact each of our member of team using our emails:
  - Martha: mfern9@ocdsb.ca
  - Hailey: hwhar2@ocdsb.ca
  - Liza: yluiz1@ocdsb.ca (work email: yluizova1@gmail.com)

## Sources used in project
1. DATABASE AND CONNECTIONS BETWEEN TABLES: 
    [2] Pixelcaveman, “Displaying mysql data to HTML using EJS,” Hashnode, https://hashnode.com/post/displaying-mysql-data-to-html-using-ejs-ckycmp85q019po7s10b0zc7yf (accessed May 14, 2024). - gathered information about how to display data from database on html web pages
    [3] “SQL Joins,” SQL joins, https://www.w3schools.com/sql/sql_join.asp (accessed May 14, 2024).
    [4] J. Ellingwood, “Joining tables in mysql: Combine data from different tables,” Prisma’s Data Guide, https://www.prisma.io/dataguide/mysql/reading-and-querying-data/joining-tables (accessed May 14, 2024).
    [5] soC, “How to display only data from database on a webpage table based in the input nodejs mysql,” The freeCodeCamp Forum, https://forum.freecodecamp.org/t/how-to-display-only-data-from-database-on-a-webpage-table-based-in-the-input-nodejs-mysql/421402/4 (accessed May 14, 2024).
    [6] “Connecting JavaScript and SQL: Learn node-sqlite cheatsheet,” Codecademy, https://www.codecademy.com/learn/connecting-javascript-and-sql/modules/learn-node-sqlite-module/cheatsheet (accessed May 14, 2024).

2. NODE JS, JAVA SCRIPT LOGIC FOR BACK-END AND SQL:
    [1] W3 Schools, “JavaScript array foreach(),” JavaScript Array forEach() Method, https://www.w3schools.com/jsref/jsref_foreach.asp (accessed May 14, 2024). - used to work for back-end part and writting logic
    [6] “Connecting JavaScript and SQL: Learn node-sqlite cheatsheet,” Codecademy, https://www.codecademy.com/learn/connecting-javascript-and-sql/modules/learn-node-sqlite-module/cheatsheet (accessed May 14, 2024).
    [7] “Querying data in sqlite database from node.js applications,” SQLite Tutorial, https://www.sqlitetutorial.net/sqlite-nodejs/query/ (accessed May 14, 2024).
    [10] S. Viridi, “Node.js, HTML form, and database,” Medium, https://medium.com/@6unpnp/node-js-html-form-and-database-2b72728a1dc4 (accessed May 14, 2024).
    [13] R. Awati, A. Hughes, and C. Stedman, “What is Microsoft SQL server?: Definition from TechTarget,” Data Management, https://www.techtarget.com/searchdatamanagement/definition/SQL-Server (accessed May 14, 2024).
    [14] M. Gathoni, “How to hash and verify a password in node.js with bcrypt,” MUO, https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/ (accessed May 14, 2024).
    [15] Web Dev Simplified, “Build node.js user authentication - password login,” YouTube, https://www.youtube.com/watch?v=Ud5xKCYQTjM (accessed May 14, 2024).
    [14] M. Gathoni, “How to hash and verify a password in node.js with bcrypt,” MUO, https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/ (accessed May 14, 2024).
    [15] Web Dev Simplified, “Build node.js user authentication - password login,” YouTube, https://www.youtube.com/watch?v=Ud5xKCYQTjM (accessed May 14, 2024).
    [16] PedroTech, “Registration and login with JWT authentication tutorial - nodejs tutorial,” YouTube, https://www.youtube.com/watch?v=b9WlsQMGWMQ (accessed May 14, 2024).
    [17] Webslesson, How to check if an email address already exists with Node.js & MySQL, https://www.webslesson.info/2023/03/how-to-check-if-an-email-address-already-exists-with-nodejs-mysql.html (accessed May 14, 2024).
    [18] Coding Shiksha, “Javascript ONSUBMIT event tutorial for beginners | how to handle forms in Javascript,” YouTube, https://www.youtube.com/watch?v=S944-epyYuI (accessed May 14, 2024).
    [13] R. Awati, A. Hughes, and C. Stedman, “What is Microsoft SQL server?: Definition from TechTarget,” Data Management, https://www.techtarget.com/searchdatamanagement/definition/SQL-Server (accessed May 14, 2024).
    [14] M. Gathoni, “How to hash and verify a password in node.js with bcrypt,” MUO, https://www.makeuseof.com/nodejs-bcrypt-hash-verify-salt-password/ (accessed May 14, 2024).
    [15] Web Dev Simplified, “Build node.js user authentication - password login,” YouTube, https://www.youtube.com/watch?v=Ud5xKCYQTjM (accessed May 14, 2024).
    [16] PedroTech, “Registration and login with JWT authentication tutorial - nodejs tutorial,” YouTube, https://www.youtube.com/watch?v=b9WlsQMGWMQ (accessed May 14, 2024).
    [17] Webslesson, How to check if an email address already exists with Node.js & MySQL, https://www.webslesson.info/2023/03/how-to-check-if-an-email-address-already-exists-with-nodejs-mysql.html (accessed May 14, 2024).
    [18] Coding Shiksha, “Javascript ONSUBMIT event tutorial for beginners | how to handle forms in Javascript,” YouTube, https://www.youtube.com/watch?v=S944-epyYuI (accessed May 14, 2024).

3. CSS STYLING AND IMAGES:
    [19] kytalpa, Physics Seamless Pattern Vector Image.
    [20] T. De Araujo, “To colour just one word,” Codecademy, https://www.codecademy.com/forum_questions/5198f3017773428a500017b5#:~:text=To%20colored%20just%20one%20word (accessed May 14, 2024).
    [21] MozDevNet, “Center an element - CSS: Cascading style sheets: MDN,” MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Center_an_element (accessed May 14, 2024).
    [22] SheCodes Athena, “[HTML] - how to create a box with HTML and CSS,” SheCodes, https://www.shecodes.io/athena/9580-how-to-create-a-box-with-html-and-css#:~:text=You%20can%20add%20a%20box,padding%2C%20margin%2C%20and%20more (accessed May 14, 2024).
    [23] SheCodes Athena, “[CSS] - how to create a full page background in CSS,” SheCodes, https://www.shecodes.io/athena/3236-how-to-create-a-full-page-background-in-css#:~:text=To%20set%20a%20full%20page%20background%20in%20CSS%2C%20use%20the,using%20the%20background%2Dposition%20property (accessed May 14, 2024).
    [24] A. Fitzgerald, “How to set opacity of images, text & more in CSS,” HubSpot Blog, https://blog.hubspot.com/website/opacity-css#:~:text=To%20set%20the%20opacity%20of,invisible (accessed May 14, 2024).
    [25] W. Craig, “Circular images with CSS,” WebFX, https://www.webfx.com/blog/web-design/circular-images-css/ (accessed May 14, 2024).
    [26] W3 Schools, “CSS Styling Images,” CSS styling images, https://www.w3schools.com/css/css3_images.asp (accessed May 14, 2024).
    [27] SheCodes Athena, “[CSS] - position text in top-right corner with CSS,” SheCodes, https://www.shecodes.io/athena/4345-position-text-in-top-right-corner-with-css (accessed May 14, 2024).
    [28] M. Sharma, “How to center a form with HTML and CSS?,” codedamn news, https://codedamn.com/news/frontend/center-a-form-with-html-css (accessed May 14, 2024).
    [29] W3 Schools, CSS Buttons, https://www.w3schools.com/css/css3_buttons.asp (accessed May 14, 2024).
    [30] memepidia.ru, Giant Thumb Guy.
    [31] W3 Schools, CSS opacity property, https://www.w3schools.com/cssref/css3_pr_opacity.php#:~:text=The%20opacity%20property%20sets%20the,and%200%20is%20completely%20transparent (accessed May 14, 2024).

4. APPLICATION SERVER AND ADDITIONAL SOURCES:
    [8] A. Merced, “What is HTMX? why it matters? and how to use it.,” DEV Community, https://dev.to/alexmercedcoder/what-is-htmx-why-it-matters-and-how-to-use-it-10h3#:~:text=HTMX%20enables%20developers%20to%20create,in%20response%20to%20server%20requests (accessed May 14, 2024).
    [9] R. Ojha, “Home,” PHP development company, https://www.raghwendra.com/blog/how-to-connect-html-to-database-with-mysql-using-php-example/ (accessed May 14, 2024). 

    [11] J. Spacey, “14 examples of an application server,” Simplicable, https://simplicable.com/IT/application-server (accessed May 14, 2024).
    [12] W3 Schools, “Web Storage API,” Web storage API, https://www.w3schools.com/js/js_api_web_storage.asp (accessed May 14, 2024).
