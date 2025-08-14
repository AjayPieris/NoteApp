import React from "react";
import { MdOutlinePushPin } from "react-icons/md"; // Pin icon
import { MdCreate, MdDelete } from "react-icons/md"; // Edit and Delete icons

// NoteCard component shows a single note with title, date, content, tags, and action buttons
function NoteCard({
  title,      // Note title
  date,       // Note creation or update date
  content,    // Note content text
  tags,       // Tags for the note
  isPinned,   // Boolean: is the note pinned or not
  onEdit,     // Function to run when Edit icon is clicked
  onDelete,   // Function to run when Delete icon is clicked
  onPinNote,  // Function to run when Pin icon is clicked
}) {
  return (
    <>
      {/* Main card container */}
      <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        {/* Header: Title + Date + Pin */}
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-sm font-medium">{title}</h6> {/* Show note title */}
            <span className="text-xs text-slate-500">{date}</span> {/* Show date */}
          </div>

          {/* Pin icon: changes color if pinned */}
          <MdOutlinePushPin
            className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`}
            onClick={onPinNote} // Run the function when clicked
          />
        </div>

        {/* Note content preview */}
        <p className="text-xs text-slate-600 mt-2">
          {content?.slice(0, 60)} {/* Show first 60 characters */}
        </p>
     
        {/* Footer: Tags + Edit/Delete icons */}
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-slate-500">{tags}</div> {/* Show tags */}

          <div className="flex items-center gap-2">
            {/* Edit icon */}
            <MdCreate
              className="icon-btn hover:text-green-600"
              onClick={onEdit} // Run the function when clicked
            />
            {/* Delete icon */}
            <MdDelete
              className="icon-btn hover:text-red-600"
              onClick={onDelete} // Run the function when clicked
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
