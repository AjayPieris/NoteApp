import React, { useState } from 'react';
import ProfileInfo from '../Cards/profileInfo';
import { useNavigate } from 'react-router-dom'; 
import SearchBar from '../SearchBar/SearchBar';


function Navbar() {

  // This state stores what the user types into the search bar
  const [searchQuery, setSearchQuery] = useState("");

  // useNavigate gives us a way to move between pages (like redirecting)
  const navigate = useNavigate();

  // This function runs when the user clicks the Logout button
  const onLogout = () => {
    navigate("/Login"); // Redirect to the Logout page
  };

  // This function will run when the search icon is clicked (🔍)
  const handleSearch = () => { 
    
  };

  // This function clears the search input when X (❌) is clicked
  const onClearSearch = () => {
    setSearchQuery(""); // Reset the input to empty
  };

  return (
    <>
      {/* Navbar container */}
      <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>

        {/* App title */}
        <h2 className='text-2xl font-medium text-black py-2'>Notes</h2>

        {/* Search bar in the middle of the navbar */}
        <SearchBar
          value={searchQuery} // Pass the current input value
          onChange={({ target }) => {
            setSearchQuery(target.value); // Update value when user types
          }}
          handleSearch={handleSearch} // Runs when 🔍 is clicked
          onClearSearch={onClearSearch} // Runs when ❌ is clicked
        />

        {/* Profile section with Logout button */}
        <ProfileInfo onLogout={onLogout} />
      </div>
    </>
  );
}

export default Navbar;
