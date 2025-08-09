import React, { useState } from 'react';
import TagInput from '../../components/input/TagInput';

function AddEditNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none border-b border-gray-300 focus:border-blue-500"
            placeholder="Go To Gym At 5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-medium text-gray-700">CONTENT</label>
          <textarea
            placeholder="Content"
            rows={10}
            className="h-36 text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border border-gray-300 focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="text-sm font-medium text-gray-700">TAGS</label>
        <TagInput />
      </div>

      <button
        className="bg-blue-500 text-white rounded p-3 font-medium mt-5 hover:bg-blue-600"
        onClick={() => {
          console.log({ title, content });
        }}
      >
        ADD
      </button>
    </>
  );
}

export default AddEditNotes;
