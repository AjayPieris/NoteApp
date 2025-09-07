import React, { useState } from "react";
import TagInput from "../../components/input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstance";

function AddEditNotes({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) {
  const [title, setTitle] = useState(noteData?.title || ""); // Store note title
  const [content, setContent] = useState(noteData?.content || ""); // Store note content
  const [tags, setTags] = useState(noteData?.tags || []); // Store tags list
  const [error, setError] = useState(null); // Store error message

  const addNewNote = async () => {
    // Function to add a new note (async because it talks to server)
    try {
      const response = await axiosInstance.post("/add-note", {
        // Send note data to server (POST request)
        title,
        content,
        tags, // Send these 3 things: title, content, tags
      });

      if (response.data && response.data.note) {
        // If server replies with a new note
        showToastMessage("add", "Note added successfully"); // Show success message
        getAllNotes(); // Refresh all notes list
        onClose(); // Close the modal/popup
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Show error message from server
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData?._id; // Get the ID of the note we want to edit
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        // Send updated data to server (PUT request)
        title, // New title
        content, // New content
        tags, // New tags
      });

      if (response.data && response.data.note) {
        showToastMessage("edit", "Note updated successfully"); // Show success message
        getAllNotes(); // Refresh the list of notes
        onClose(); // Close the modal/popup
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Show error message from server
      }
    }
  };

  // Handle form submit (add or edit note)
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title"); 
      return;
    }
    if (!content) {
      setError("Please enter the Content"); 
      return;
    }
    setError(""); 

    if (type === "edit") {
      // If editing note
      editNote(); // Call edit function
    } else {
      // Else (new note)
      addNewNote(); // Call add function
    }
  };

  return (
    <>
      <div className="relative">
        {/* Close Button (❌ in top corner) */}
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
          onClick={onClose} // When clicked → close form
        >
          <MdClose className="text-xl text-slate-400"></MdClose> {/* ❌ Icon */}
        </button>

        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none border-b border-gray-300 focus:border-blue-500"
            placeholder="Note Title"
            value={title} // Bind value with state
            onChange={({ target }) => setTitle(target.value)} // Update title when typing
          />
        </div>

        {/* Content Input */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-gray-700">CONTENT</label>
          <textarea
            placeholder="Content"
            rows={10}
            className="h-36 text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border border-gray-300 focus:border-blue-500"
            value={content} // Bind value with state
            onChange={({ target }) => setContent(target.value)} // Update content when typing
          />
        </div>
      </div>

      {/* Tags Section */}
      <div className="mt-3">
        <label className="text-sm font-medium text-gray-700">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />{" "}
        {/* Use TagInput component */}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs pt-4 ">{error}</p>}

      {/* Add/Edit Button */}
      <button
        className="bg-blue-500 w-full text-white rounded p-3 font-medium mt-5 hover:bg-blue-600"
        onClick={handleAddNote} // On click → run handleAddNote
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </>
  );
}

export default AddEditNotes;
