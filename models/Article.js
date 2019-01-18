// *** Include Modules: npm (mongoose)
const mongoose = require("mongoose");

// Set reference to Schema constructor and create new Article schema object
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  // Include associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create model from schema
const Article = mongoose.model("Article", ArticleSchema);

// Export model
module.exports = Article;
