// 1. Bring in mongoose (a library to work with MongoDB easily)
const mongoose = require("mongoose");

// 2. Create a "blueprint" (schema) for how a user should look in the database
const userSchema = new mongoose.Schema({
  // User must have a full name (text only, cannot be empty)
  fullName: { type: String, required: true },

  // User must have an email (text, cannot be empty, must be unique — no duplicates allowed)
  email: { type: String, required: true, unique: true },

  // User must have a password (text only, cannot be empty)
  password: { type: String, required: true },
});

// 3. Turn the schema into a model called "User"
// Mongoose will automatically make a "users" collection in MongoDB
module.exports = mongoose.model("User", userSchema);
