// *** Include Modules: npm (mongoose)
const mongoose = require("mongoose");

// Set reference to Schema constructor and create new Note schema object
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  title: String,
  body: String
});

// Create model from schema
const Note = mongoose.model("Note", NoteSchema);

// Export model
module.exports = Note;
