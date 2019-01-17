# News Scraper
### 1. Why / Background
  * This is Berkeley Coding Boot Camp (BCBC) week 10 homework assignment.
    * The BCBC curriculum generally focuses on JavaScript along with HTML/CSS, using the MERN (MongoDB, Express, React, Node) software stack, to teach web development skills across the client and server. 
  * News Scraper is a web app that enable users to view and leave comments on the latest news.
 ### 2. What / Objectives / User Stories
  * From design through deployment of the application, this project used the following web development technologies:
    * Server-side: Node.js with Express web application framework and MongoDB database for data persistence
    * Client-side: Bootstrap front-end framework for HTML/CSS
  * User Stories, by categorization:
    * Set up web application framework using Express
    * Design and develop Model schema including ODM (Mongoose) and DB (MongoDB) configuration
    * Design and develop View on UI
    * Design and develop Controller functions including HTTP requests/responses
 ### 3. How / Design Description
  * Although scope of the project fits well into [Agile methodology with Scrum and Kanban frameworks](https://en.wikipedia.org/wiki/Agile_software_development), due to limited scope and non-group assignment, GitHub's built-in tools were not used to support project execution:
    * Projects: Kanban board for documenting user stories and overall progress
    * Issues: Issue tracking for user stories, features and bug report
  * Functionality - refer to [video of application user flow](https://drive.google.com/drive/folders/1PWeVaiAW64v2gYkkCKrSqTRhJEE6nBCx?usp=sharing):
  * Design Description
    * Application Setup (server.js)
      * Configure Express web app framework listening on process.env.PORT (Heroku) or default to 3000. Parse URL encoded, any type including nested objects, and JSON and call appropriate routing.
      * Required modules: npm (dotenv, express, express-handlebars), path
      * Relevant functions: require(), use(), engine(), set(), sync(), listen()
      * Export: app
    * Database Setup (schema.sql, seeds.sql TBD)
      * Create pawstagram_db database
      * Available Seed with TBD
    * Configuration Definition (config.json)
      * Define configuration object with nested development, test and production environments
    * Model Setup (/models, index.js)
      * Define Sequelize version of Community, User, Pet, PetPhoto, PhotoPost objects including associations
      * TBD Configure connection to MySQL configuration
      * TBD Include connection conditional to enable MySQL with Heroku deployment using JawsDB add-on
      * Required modules: fs, path, sequelize, config.json
      * Relevant functions: require(), readdirSync(), filter(), forEach(), import(), join(), keys(), associate(), exports(), define(), belongsToMany(), hasMany(), belongsTo()
      * Export: db, Community, Pet, PetPhoto, PhotoPost, User
    * Controller Setup (apiRoutes.js, htmlRoutes.js)
      * Assign routing views <-> model <-> DB as HTTP methods <-> CRUD operations <-> SQL
        * POST <-> Create <-> INSERT
        * GET <-> Read <-> SELECT
        * PUT <-> Update <-> UPDATE
        * DELETE <-> Delete <-> DELETE
      * Required modules: /models, path
      * Relevant functions: require(), exports(), get(), findAll(), findOne(), post(), create(), put(), update(), delete(), destroy(), sendFile(), render()
      * Export: router, function(app) {}
    * View Setup (server-side: /layout/main.handlebars, /layout/partials/*.handlebars, *.handlebars, client-side: home-page, login-page, signup-page)
      * Render statically HTML pages on the client-side within /public.
      * Use Handlebars.js as web templating system with HTML pages leveraging main.handlebars layout and various *.handlebars partials.  
  * Prerequisites for Development:
    * MacBook Air (Intel Core i7, 2.2 GHz, 1 Processor, 2 Cores, 8GB)
    * 64 bit operating system 
    * git version 2.18.0
    * Visual Studio Code Version 1.29.1
    * [GitHub](https://github.com/jkawahara/news-scraper)
    * Chrome Version 70.0.3538.110 (Official Build) (64-bit)
  * Built With:
    * Server-side:
      * [Node.js](https://nodejs.org/docs/latest/api/documentation.html)
        * [npm](https://www.npmjs.com/)
          * [express](https://www.npmjs.com/package/express)
          * [express-handlebars](https://www.npmjs.com/package/express-handlebars)
          * [mongoose](https://www.npmjs.com/package/mongoose)
          * [body-parser](https://www.npmjs.com/package/body-parser)
          * [cheerio](https://www.npmjs.com/package/cheerio)
          * [request](https://www.npmjs.com/package/request)
    * Client-side: HTML, CSS, JavaScript
    * Cloud: [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) with [mLab MongoDB](https://devcenter.heroku.com/articles/mongolab)
  * Installing:
    * For further development or use of this application, clone or download application files from GitHub, which is organized into the following directory structure:
      * /news-scraper (application root directory level)
        * /models
          * TBD
          * index.js
        * /node_modules (ignored by git) - generated first time npm install executes
        * /public
          * app.js
          * index.html
        * .gitignore
        * LICENSE
        * package-lock.json
        * package.json - includes dependencies
        * README.md
        * server.js
    * Once the application files are ready per the above structure, go to the application root directory level
      * Enter the following in termminal to install required node packages. This executes by referring to the included dependencies in package.json and creates required node packages in /node_modules and package-lock.json:
        * npm install
  * Running the tests:
    * Unit testing & integration testing was informally executed
  * Deployment:
    * Deployed on [Heroku](https://bcbc-news-scraper.herokuapp.com/)
 ## Versioning
  * For the versions available, see the tags on this repository.
 ## Authors
  * John Kawahara.
  * N/A- See also the list of contributors who participated in this project.
 ## License
  * This project is licensed under the [MIT License](LICENSE).
 ## Acknowledgments
  * Thanks to BCBC program personnel, especially our instructor, David Hallinan, along with our TAs, Hannah Bowers and Glo Austin, for their guidance and support.
