import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6"; // 🔍
import { IoMdClose } from "react-icons/io";          // ❌

// This is the SearchBar component
// It gets 4 things from the parent component:
// value → the text typed inside the box
// onChange → what happens when user types
// handleSearch → what happens when user clicks the search icon
// onClearSearch → what happens when user clicks the X to clear
function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    // The outer box that holds the search bar
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      
      {/* The text box where the user types their search */}
      <input
        type="text" // Input box type is text
        placeholder="Search Notes" // Shows grey text when it's empty
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value} // Shows the current text (controlled by parent)
        onChange={onChange} // When user types, call the onChange function
      />

      {/* Show the ❌ (clear) icon ONLY when there is something typed */}
      {value && (
        <IoMdClose
          className="text-xl text-slate-400 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch} // When user clicks ❌, clear the input
        />
      )}

      {/* Always show the 🔍 search icon */}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch} // When user clicks 🔍, run the search
      />
    </div>
  );
}

export default SearchBar;
