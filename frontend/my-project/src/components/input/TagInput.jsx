import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]); // ✅ Corrected .trim()
      setInputValue(""); // ✅ Clear input after adding
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submit on Enter
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div>
        {/* Show tags list only if there’s at least 1 tag */}
        {tags?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
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

        {/* Tag input section */}
        <div className="flex items-center gap-4 mt-3">
          <input
            type="text"
            value={inputValue} // ✅ Controlled input
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
