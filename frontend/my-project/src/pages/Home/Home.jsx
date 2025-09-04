import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/image/add-notes.jpeg";
import NoDataImg from "../../assets/image/NoData.jpeg";

function Home() {
  // Add/Edit modal state
  const [openAddEditModal, setOpenEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // Toast message state
  const [toastMessage, setToastMessage] = useState({
    isShown: false,
    type: "",
    message: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEditNote = (noteDetails) => {
    setOpenEditModel({ isShown: true, type: "edit", data: noteDetails });
  };

  const showToastMessage = (type, message) => {
    setToastMessage({ isShown: true, type, message });
  };

  const handleCloseToast = () => {
    setToastMessage({ isShown: false, type: "", message: "" });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Error fetching user info:", error.message);
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data?._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.data && !response.data.error) {
        showToastMessage("delete", "Note deleted successfully");
        getAllNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Search for a Note
  const onSearchNote = async (query) => {
    if (!query) return;

    try {
      const response = await axiosInstance.get("/search-notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: { query },
      });

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
        setIsSearch(true);
      }
    } catch (error) {
      console.error("Error searching notes:", error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

const updateIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteData._id, {
          isPinned: !noteData.isPinned
        });
      if (response.data && !response.data.error) {
        showToastMessage("success", "Note updated successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 m-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id || index}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEditNote(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)} // placeholder
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? "No notes found. Try a different search."
                : "Your notebook is waiting! Start by creating your very first note and keep all your thoughts in one place."
            }
          />
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="w-16 h-16 mt-8 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenEditModel({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenEditModel({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add/Edit Note"
        className="w-[40%] max-h-[75%] bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenEditModel({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {/* Toast Messages */}
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
