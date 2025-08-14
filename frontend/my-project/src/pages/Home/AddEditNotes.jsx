import React, { useState } from 'react';
import TagInput from '../../components/input/TagInput';
import { MdClose } from 'react-icons/md';

function AddEditNotes({noteData, type, onClose}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error,setError] = useState(null);

  // Add Note
  const addNewNote = async () => {};

  // Edit Note
  const editNote = async () => {};

  const handleAddNote = () => {
    if(!title) {
      setError("Please enter the title")
      return;
    }
    if(!content){
      setError("Please enter the Content")
      return;
    }
    setError("");

    if(type === 'edit'){
      editNote()
    } else {
      addNewNote()
    }
  }
  return (
    <>
      <div className='relative'>
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
          <MdClose className='text-xl text-slate-400'></MdClose>
        </button>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none border-b border-gray-300 focus:border-blue-500"
            placeholder="Go To Gym At 5"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-gray-700">CONTENT</label>
          <textarea
            placeholder="Content"
            rows={10}
            className="h-36 text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border border-gray-300 focus:border-blue-500"
            value={content}
            onChange={({target}) => setContent(target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="text-sm font-medium text-gray-700">TAGS</label>
       {/* Show the TagInput component */}
       {/* Give it the current list of tags */}
        {/* Give it the power to change the tags */}
        <TagInput tags={tags} setTags={setTags}/>
      </div>

     {error && <p className='text-red-500 text-xs pt-4 '>{error}</p>}

      <button
        className="bg-blue-500 w-full text-white rounded p-3 font-medium mt-5 hover:bg-blue-600"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </>
  );
}

export default AddEditNotes;
