// 1. Import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;  // just a shortcut to use mongoose.Schema

// 2. Create a "blueprint" (schema) for how a Note will look in the database
const noteSchema = new Schema({
    // Every note must have a title (text, required)
    title: {
        type: String,
        required: true
    },

    // Every note must have content (text, required)
    content: {
        type: String,
        required: true
    },

    // A note can have tags (list/array of text strings), default is empty
    tags: {
        type: [String],
        default: []
    },

    // A note can be pinned or not (true/false), default is false
    isPinned: {
        type: Boolean,
        default: false
    },

    // This note belongs to a user
    // userId stores the _id of a User (relation between Note ↔ User)
    userId: {
        type: Schema.Types.ObjectId,  // MongoDB ObjectId (like a unique ID)
        ref: "User",                  // refers to the "User" model
        required: true
    },

    // The date when the note was created (default = now)
    createdOn: {
        type: Date,
        default: Date.now
    }
});

// 3. Turn the schema into a model called "Note"
// MongoDB will create/use a "notes" collection for this
module.exports = mongoose.model("Note", noteSchema);
