import React, { use, useEffect, useState } from "react"; 
import Navbar from "../../components/Navbar/Navbar"; 
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdOutlineAlarmAdd } from "react-icons/md"; 
import AddEditNotes from "./AddEditNotes"; 
import moment from "moment";
import Modal from "react-modal"; 
// Import Modal library to show a popup window
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/ToastMessage/Toast";


function Home() {
  // Home component: main page of your notes app
  const [openAddEditModal, setOpenEditModel] = useState({
    isShown: false, // whether the popup/modal is visible or not
    type: "add", // type of action: "add" or "edit"
    data: null, // data for the note being edited (null when adding new)
  });

  const [toastMessage, setToastMessage] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();
  const handleEditNote = (noteDetails) => {
    setOpenEditModel({ isShown: true, type: "edit", data: noteDetails });
  };

const showToastMessage = (type, message) => {
  setToastMessage({ isShown: true, type, message });
};

const handleCloseToast = () => {
  setToastMessage({ isShown: false, type: "add", message: "" });
};

// Get User Info
const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/get-user");
    if(response.data && response.data.user) {
      setUserInfo(response.data.user);
    }
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      navigate("/login");
    }
  }
};

//get all Info
const getAllNotes = async () => {
  try {
    const response = await axiosInstance.get("/get-all-notes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (response.data && response.data.notes) {
      setAllNotes(response.data.notes);
      // Handle the notes data (e.g., set it to state)
    }
  } catch (error) {
    console.log("An expected error occurred while fetching notes");
  }
};

// Delete Note
const deleteNote = async (data) => {
  const noteId = data?._id;
  try {
    const response = await axiosInstance.delete("/delete-note/" + noteId);
    if (response.data && !response.data.error) {
      showToastMessage("Note deleted successfully", "delete");
      getAllNotes();
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log("an expected error occurred while deleting note");
    }
  }
};

useEffect(() => {
  getUserInfo();
  getAllNotes();
  return () => {};
}, []);

  return (
    <>
      <Navbar userInfo={userInfo} /> 
      {/* Show Navbar at the top */}

      <div className="container mx-auto ">
        {/* Main container, centered on the page */}
        <div className="grid grid-cols-3 gap-4 m-8 ">
          {allNotes.map((item, index) => (
             <NoteCard
             key={item._id || index}
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}

            onEdit={() => {handleEditNote(item)}}  
            onDelete={() => deleteNote(item)} 
            onPinNote={() => {}} 
            
          />
          ))}
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
          getAllNotes={getAllNotes} 
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={toastMessage.isShown}
        type={toastMessage.type}
        message={toastMessage.message}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default Home;
// Export the Home component so it can be used in other files
