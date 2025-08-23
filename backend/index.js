require("dotenv").config();

const config = require("./config");
const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // use bcryptjs for portability
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

const User = require("./Models/user.model");
const Note = require("./Models/note.model");

const app = express();

// startup checks
// Stop app if secret key is missing
if (!process.env.ACCESS_TOKEN_SECRET) {
  console.error("ACCESS_TOKEN_SECRET is not set");
  process.exit(1);
} // Why: prevents app running without the secret (for security)

// middleware
// 1. Allow requests from any website (CORS)
app.use(cors({ origin: "*" }));
// 2. Automatically read JSON data sent by clients
app.use(express.json());
// 3. Automatically read data sent from HTML forms
app.use(express.urlencoded({ extended: true }));


// handle invalid JSON payloads gracefully
app.use((err, req, res, next) => {
   // Check if the error is caused by bad JSON in the request
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  // If it’s another kind of error, pass it to the next error handler
  next(err);
});

// Connect to MongoDB
mongoose.connect(config.connectionString)
  .then(() => console.log("Connected to MongoDB")) // success
  .catch((err) => {                                // failure
    console.error("Failed to connect:", err.message);
    process.exit(1);                                // stop app
  });

// test route
app.get("/", (req, res) => {
  res.json({ data: "Hello World" });
});

//Backend Ready!!

// create account
app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body || {};

    if (!fullName)
      return res.status(400).json({ error: "Full name is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });

    const isUser = await User.findOne({ email });
    if (isUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      error: false,
      user,
      accessToken,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      error: false,
      user,
      accessToken,
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const isUser = await User.findById(userId);
  if (!isUser)
    {
      return res.status(404).json({ error: "User not found"  });
    }

  return res.json({
    error: false,
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "User retrieved successfully",
  });
});

// add note
app.post("/add-note", authenticateToken, async (req, res) => {
  try {
    const { title, content, tags } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const note = new Note({
      title,
      content,
      tags: Array.isArray(tags) ? tags : [],
      userId: req.user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to add note" });
  }
});

// edit note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body || {};
  const userId = req.user._id;

  const update = {};
  if (typeof title === "string") update.title = title;
  if (typeof content === "string") update.content = content;
  if (Array.isArray(tags)) update.tags = tags;
  if (typeof isPinned === "boolean") update.isPinned = isPinned;

  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: "At least one field is required" });
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: update },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update note" });
  }
});

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }).sort({
      isPinned: -1,
    });

    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user._id;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) return res.status(404).json({ error: "Note not found" });

    await Note.deleteOne({ _id: noteId, userId });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete note" });
  }
});

// Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const userId = req.user._id;

  let { isPinned } = req.body || {};

  // Coerce common client formats
  if (typeof isPinned === "string") {
    if (isPinned.toLowerCase() === "true") isPinned = true;
    else if (isPinned.toLowerCase() === "false") isPinned = false;
  } else if (typeof isPinned === "number") {
    isPinned = isPinned === 1;
  }

  if (typeof isPinned !== "boolean") {
    return res.status(400).json({ error: "isPinned must be a boolean" });
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { $set: { isPinned } },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });

    return res.json({
      error: false,
      note,
      message: "Note pinned status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to update note pinned status" });
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
