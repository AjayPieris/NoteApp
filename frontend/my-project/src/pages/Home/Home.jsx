import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd, MdOutlineAlarmAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal"; // library that shows a popup window

function Home() {
  const [openAddEditModal, setOpenEditModel] = useState({
    isShown: false, //
    type: "add",//What kind of action is the popup for?
    data: null,
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 m-8">
          <NoteCard
            title="Meeting on 25th December"
            date="12th Dec 2025"
            content="Meeting on 25th December"
            tags="#Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 mt-8 items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 "
        onClick={() => {
          setOpenEditModel({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] w-16 h-8 text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-[75%] bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
      >
        <AddEditNotes />
      </Modal>
    </>
  );
}

export default Home;
