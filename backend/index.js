require('dotenv').config();

const config = require("./config");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./Models/user.model");
const Note = require("./Models/note.model");

const express = require("express")
const cors = require("cors");
const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken} = require("./utilities");

app.use(express.json());

app.use(cors({
    origin: '*',
}));

app.get("/",(req, res) => {
    res.json({ data: "Hello World" });
});

// create account
app.post("/create-account", async (req, res) => {
    const {fullName, email, password} = req.body;

    if(!fullName){
        return res.status(400).json({ error: "Full name is required" });
    }
    if(!email){
        return res.status(400).json({ error: "Email is required" });
    }
    if(!password){
        return res.status(400).json({ error: "Password is required" });
    }

   const isUser = await User.findOne({ email: email });

   if (isUser) {
       return res.status(400).json({ error: "User already exists" });
   }

   const user = new User({
       fullName,
       email,
       password
   });

    await user.save();

    const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
    return res.json({
        error: false,
        user,
        accessToken,
        message: "User created successfully"
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
        return res.status(400).json({ error: "Invalid password" });
    }
    const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Login successful"
    });
});

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
   try {
    const note = new Note({
        title,
        content,
        tags: tags || [],
        userId: req.user._id,
    });

    await note.save();

    return res.json({
        error: false,
        note,
        message: "Note added successfully"
    });
    }
     catch(error) {
         return res.status(500).json({ error: "Failed to add note" });
    }
    });

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

module.exports = app;