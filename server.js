// *** Include Modules: npm (express, morgan, mongoose, axios, cheerio), /models
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");

// Set PORT to Heroku process.env.PORT (deployed) or 3000 (localhost)
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Configure middleware: morgan logger, URL-encoded & JSON body parser, public folder to serve static files
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set MongoDB name to Heroku mLab URI (deployed) or mongoHeadlines (localhost)
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set up mongoose to use built in ES6 promises and connect to MongoDB
mongoose.Promise = Promise;
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// *** Routes
// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// GET method to render home page
app.get("/", (req, res) => {
  db.Article.find({})
    .sort({ title: 1 })
    .then(dbArticle => {
      var hbsObject = {
        articles: dbArticle
      };
      res.render("index", hbsObject);
    });
});

// GET method to scrape website with AXIOS call
app.get("/scrape", (req, res) => {
  axios.get("http://www.astronomy.com/news").then(response => {
    // Set shorthand selector from response
    const $ = cheerio.load(response.data);

    // Website endpoint structured with each article organized into dataSection class <div>
    $("div.dataSection h2").each(function(i, element) {
      // Structure result from elements within dataSection class div as object with following keys: title (text of <a> child of <h2>), summary (snippet class <div> which is next sibling of <h2>) and link (href of <a> child of <h2>)
      const result = {};
      debugger;
      result.date = $(this)
        .parents(".dataSection")
        .children()
        .first()
        .text();
      result.title = $(this)
        .children("a")
        .text();
      result.summary = $(this)
        .next()
        .text();
      result.link =
        "http://www.astronomy.com" +
        $(this)
          .children("a")
          .attr("href");
      // Create new entry in Article collection with result
      db.Article.create(result)
        .then(dbArticle => {
          // Log to console
          console.log(dbArticle);
        })
        .catch(error => {
          // Log any errors
          console.log(error);
        });
    });
    // Send message to client
    res.send("Scrape Complete");
  });
});

// GET method to render Article collection
app.get("/articles", (req, res) => {
  // Find all articles in collection
  db.Article.find({})
    .sort({ title: 1 })
    .then(dbArticle => {
      // Respond with articles to client
      res.json(dbArticle);
    })
    .catch(error => {
      // Respond with any errors to client
      res.json(error);
    });
});

// GET method to render specific Article entry by id, including associated note
app.get("/articles/:id", (req, res) => {
  // Find one article in collection
  db.Article.findOne({ _id: req.params.id })
    // Include associated note
    .populate("note")
    .then(dbArticle => {
      // Respond with article to client
      res.json(dbArticle);
    })
    .catch(error => {
      // Respond with any errors to client
      res.json(error);
    });
});

// POST method to create or update Article's associated Note
app.post("/articles/:id", (req, res) => {
  // Create note with req.body
  db.Note.create(req.body)
    .then(dbNote => {
      // Find one article and update associated note, then return updated article
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .then(dbArticle => {
      // Respond with article to client
      res.json(dbArticle);
    })
    .catch(error => {
      // Respond with any errors to client
      res.json(error);
    });
});

// *** Start server and listen for requests
app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});
