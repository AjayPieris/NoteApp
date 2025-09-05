import React from 'react';               // Import React library
import { StrictMode } from 'react';      // Import StrictMode for highlighting potential issues
import { createRoot } from 'react-dom/client'; // Import createRoot to render the app into the DOM
import App from './App.jsx';             // Import the main App component
import './App.css';                      // Import CSS styling

// Render the App component inside the root element
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <App />   {/* Our main application component */}
  </StrictMode>
);