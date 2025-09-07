// 👉 Import tools
import React, { useState } from 'react';         // React + state management
import TagInput from '../../components/input/TagInput'; // TagInput component
import { MdClose } from 'react-icons/md';        // Close ❌ icon
import axiosInstance from '../../utils/axiosinstance';
// 👉 Main Component
function AddEditNotes({noteData, type, getAllNotes, onClose, showToastMessage}) {  // Receives props: note data, type (add/edit), and close function

  // 👉 States (local storage for inputs)
  const [title, setTitle] = useState(noteData?.title || "");       // Store note title
  const [content, setContent] = useState(noteData?.content || "");   // Store note content
  const [tags, setTags] = useState(noteData?.tags || []);         // Store tags list
  const [error,setError] = useState(null);      // Store error message

  // 👉 Function placeholders (backend logic can go here later)
  const addNewNote = async () => {
     try {
      const response = await axiosInstance.post("/add-note", {
        title, content, tags  
     });
     if(response.data && response.data.note) {
       showToastMessage("add", "Note added successfully");
       getAllNotes();
       onClose();
     }
   } catch (error) {
     if(error.response && error.response.data && error.response.data.message) {
       setError(error.response.data.message);
     }
   }
  };            // Add note function
  const editNote = async () => {
    const noteId = noteData?._id;
    try {
      const response = await axiosInstance.put("/edit-note/"+noteId, {
        title,
        content,
        tags
     });
     if(response.data && response.data.note) {
      showToastMessage("edit", "Note updated successfully");
       getAllNotes();
       onClose();
     }
   } catch (error) {
     if(error.response && error.response.data && error.response.data.message) {
       setError(error.response.data.message);
     }
   }
  };              // Edit note function

  // 👉 Handle form submit (add or edit note)
  const handleAddNote = () => {
    if(!title) {                                // If title empty
      setError("Please enter the title");       // Show error
      return;
    }
    if(!content){                               // If content empty
      setError("Please enter the Content");     // Show error
      return;
    }
    setError("");                               // Clear errors

    if(type === 'edit'){                        // If editing note
      editNote();                               // Call edit function
    } else {                                    // Else (new note)
      addNewNote();                             // Call add function
    }
  };

  // 👉 JSX (UI Part)
  return (
    <>
      <div className='relative'>
        {/* Close Button (❌ in top corner) */}
        <button 
          className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' 
          onClick={onClose}                     // When clicked → close form
        >
          <MdClose className='text-xl text-slate-400'></MdClose> {/* ❌ Icon */}
        </button>

        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none border-b border-gray-300 focus:border-blue-500"
            placeholder="Note Title"
            value={title}                       // Bind value with state
            onChange={({target}) => setTitle(target.value)} // Update title when typing
          />
        </div>

        {/* Content Input */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-gray-700">CONTENT</label>
          <textarea
            placeholder="Content"
            rows={10}
            className="h-36 text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border border-gray-300 focus:border-blue-500"
            value={content}                     // Bind value with state
            onChange={({target}) => setContent(target.value)} // Update content when typing
          />
        </div>
      </div>

      {/* Tags Section */}
      <div className="mt-3">
        <label className="text-sm font-medium text-gray-700">TAGS</label>
        <TagInput tags={tags} setTags={setTags}/> {/* Use TagInput component */}
      </div>

      {/* Error Message */}
      {error && <p className='text-red-500 text-xs pt-4 '>{error}</p>}

      {/* Add/Edit Button */}
      <button
        className="bg-blue-500 w-full text-white rounded p-3 font-medium mt-5 hover:bg-blue-600"
        onClick={handleAddNote}                 // On click → run handleAddNote
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </>
  );
}

// 👉 Export component to use in other files
export default AddEditNotes;
