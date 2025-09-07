import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
  if (e.key === "Enter") {  // Check if the pressed key is Enter
    e.preventDefault();    // Stop the browser from doing its default action (like submitting a form)
    addNewTag();           // Call function to add the current input as a new tag
  }
};


  const handleRemoveTag = (tagToRemove) => {  // tagToRemove = the tag we want to delete
  setTags(
    tags.filter((tag) => tag !== tagToRemove)   // go through all tags → keep only those that are NOT equal to tagToRemove
  );
};


  return (
    <>
      <div>
        {tags?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-2 ">
            {tags.map((tag, index) => (
              <span
                key={index}
                className=" flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdClose />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mt-3">
          <input
            type="text"
            value={inputValue}
            className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
            placeholder="Add tags"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 group"
            onClick={addNewTag}
          >
            <MdAdd className="text-2xl text-blue-700 group-hover:text-white" />
          </button>
        </div>
      </div>
    </>
  );
}

export default TagInput;
