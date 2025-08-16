import React, { useState } from "react"; 
// Import React library and useState hook (to manage state inside functional components)

import Navbar from "../../components/Navbar/Navbar"; 
// Import your Navbar component

import NoteCard from "../../components/Cards/NoteCard"; 
// Import NoteCard component that displays individual notes

import { MdAdd, MdOutlineAlarmAdd } from "react-icons/md"; 
// Import icons from react-icons library (MdAdd is the + button icon)

import AddEditNotes from "./AddEditNotes"; 
// Import AddEditNotes component which is the popup for adding/editing notes

import Modal from "react-modal"; 
// Import Modal library to show a popup window


function Home() {
  // Home component: main page of your notes app
  const [openAddEditModal, setOpenEditModel] = useState({
    isShown: false, // whether the popup/modal is visible or not
    type: "add", // type of action: "add" or "edit"
    data: null, // data for the note being edited (null when adding new)
  });

  return (
    <>
      <Navbar /> 
      {/* Show Navbar at the top */}

      <div className="container mx-auto ">
        {/* Main container, centered on the page */}
        <div className="grid grid-cols-3 gap-4 m-8 ">
          {/* Grid layout: 3 columns, with gap between cards */}
          <NoteCard
            title="Meeting on 25th December"
            date="12th Dec 2025"
            content="Meeting on 25th December"
            tags="#Meeting"
            isPinned={true} 
            // NoteCard properties: title, date, content, tags, pinned
            onEdit={() => {}} 
            // Function to handle edit click (empty for now)
            onDelete={() => {}} 
            // Function to handle delete click (empty for now)
            onPinNote={() => {}} 
            // Function to handle pin/unpin (empty for now)
          />
        </div>
      </div>

      <button
        className="w-16 h-16 mt-8 items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 "
        // Floating button on bottom-right corner to add new note
        onClick={() => {
          setOpenEditModel({ isShown: true, type: "add", data: null }); 
          // When clicked, open the modal to add a new note
        }}
      >
        <MdAdd className="text-[32px] w-16 h-8 text-white" /> 
        {/* + icon inside the button */}
      </button>

      <Modal
        isOpen={openAddEditModal.isShown} 
        // Show modal only if isShown is true
        onRequestClose={() => {}} 
        // Function to run when user tries to close modal (empty for now)
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)", 
            // Slightly dark background behind modal
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-[75%] bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
        // Styling for modal content
      >
        <AddEditNotes 
          type={openAddEditModal.type} 
          // Pass the type ("add" or "edit") to the popup
          noteData={openAddEditModal.data} 
          // Pass the note data if editing
          onClose={()=>{
            setOpenEditModel({isShown: false, type:"add", data: null}) 
            // Close the modal when popup tells it to close
          }}
        />
      </Modal>
    </>
  );
}

export default Home;
// Export the Home component so it can be used in other files
