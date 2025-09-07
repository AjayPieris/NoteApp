import React, { useState } from "react";                 
import { MdAdd, MdClose } from "react-icons/md";         

function TagInput({ tags, setTags }) {                     // Component gets "tags" list + "setTags" function from parent
  const [inputValue, setInputValue] = useState("");        // Store what the user is typing in the input box

  const handleInputChange = (e) => {                       
    setInputValue(e.target.value);                         
  };

  const addNewTag = () => {                                // Function to add a new tag
    if (inputValue.trim() !== "") {                        // Only add if input is not empty
      setTags([...tags, inputValue.trim()]);               // Add new tag to the existing list
      setInputValue("");                                   // Clear the input box
    }
  };

  const handleKeyDown = (e) => {                          
    if (e.key === "Enter") {                               
      e.preventDefault();                                  
      addNewTag();                                         
    }
  };

  const handleRemoveTag = (tagToRemove) => {               // Function to remove a tag
    setTags(tags.filter((tag) => tag !== tagToRemove));    // Keep all tags except the one clicked
  };

  return (
    <>
      <div>
        {tags?.length > 0 && (                             
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {tags.map((tag, index) => (                    // Loop through each tag
              <span
                key={index}
                className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
              >
                #{tag}                                     {/* Show the tag with a # in front */}
                <button
                  onClick={() => handleRemoveTag(tag)}     // Remove tag when ❌ clicked
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
            onChange={handleInputChange}                   // Update state while typing
            onKeyDown={handleKeyDown}                      // Press Enter → add tag
          />
          <button
            className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 group"
            onClick={addNewTag}                            // Add tag when ➕ button clicked
          >
            <MdAdd className="text-2xl text-blue-700 group-hover:text-white" /> 
          </button>
        </div>
      </div>
    </>
  );
}

export default TagInput;                                
