// 👉 Step 1: Import React and useState for storing data
import React, { useState } from "react";

// 👉 Step 2: Import two icons (Add + Close) from react-icons
import { MdAdd, MdClose } from "react-icons/md";

// 👉 Step 3: Create a component called TagInput
//    It receives two things from parent: tags (list) and setTags (function)
function TagInput({ tags, setTags }) {
  // 👉 Step 4: Create state for the text input box
  const [inputValue, setInputValue] = useState("");

  // 👉 Step 5: Function to update state when user types
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // store current typing value
  };

  // 👉 Step 6: Function to add a new tag
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]); // add new tag to list
      setInputValue(""); // clear input box
    }
  };

  // 👉 Step 7: Function to allow pressing Enter to add tag
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // stop form from submitting
      addNewTag();        // add the tag
    }
  };

  // 👉 Step 8: Function to remove a tag when ❌ clicked
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 👉 Step 9: UI part (what user sees)
  return (
    <>
      <div>
        {/* 👉 Step 9a: Show tags only if we have at least 1 */}
        {tags?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-2 ">
            {tags.map((tag, index) => (
              <span
                key={index}
                className=" flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
              >
                #{tag}
                <button
                  onClick={() => handleRemoveTag(tag)} // remove this tag
                  className="text-red-500 hover:text-red-700"
                >
                  <MdClose /> {/* ❌ icon */}
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 👉 Step 9b: Input box + Add button */}
        <div className="flex items-center gap-4 mt-3">
          <input
            type="text"
            value={inputValue} // controlled input
            className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
            placeholder="Add tags"
            onChange={handleInputChange} // update state when typing
            onKeyDown={handleKeyDown}   // press Enter to add
          />
          <button
            className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 group"
            onClick={addNewTag} // add tag when button clicked
          >
            <MdAdd className="text-2xl text-blue-700 group-hover:text-white" /> {/* ➕ icon */}
          </button>
        </div>
      </div>
    </>
  );
}

// 👉 Step 10: Export this component so it can be used in other files
export default TagInput;
