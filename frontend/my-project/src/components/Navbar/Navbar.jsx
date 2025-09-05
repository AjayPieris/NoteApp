import React, { useState } from 'react';
import ProfileInfo from '../Cards/profileInfo'; // Shows user profile + logout
import { useNavigate } from 'react-router-dom'; // For page navigation
import SearchBar from '../SearchBar/SearchBar'; // Custom search bar component

// Navbar takes props: userInfo, onSearchNote, handleClearSearch  
// Props are like inputs you give to the component so it can work properly.
function Navbar({ userInfo, onSearchNote, handleClearSearch }) {

  // Store what the user types in search bar
  const [searchQuery, setSearchQuery] = useState("");

  // Hook to move between pages
  const navigate = useNavigate();

  // Logout: clear saved data + go to Login page
  const onLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  // When user clicks 🔍 → search notes
  const handleSearch = () => { 
    if (searchQuery) {
      onSearchNote(searchQuery); // Run parent’s search function
    } 
  };

  // When user clicks ❌ → clear input + reset notes
  const onClearSearch = () => {
    setSearchQuery(""); 
    handleClearSearch();
  };

  return (
    <>
      {/* Navbar container */}
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>

        {/* App title (left side) */}
        <h2 className='text-2xl font-medium text-black py-2'>Notes</h2>

        {/* Search bar (center) */}
        <SearchBar
          value={searchQuery} // Current input text
          onChange={({ target }) => setSearchQuery(target.value)} // Update when typing
          handleSearch={handleSearch} // Runs on 🔍
          onClearSearch={onClearSearch} // Runs on ❌
        />

        {/* Profile info + logout button (right side) */}
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </>
  );
}

export default Navbar;
