// Bring React into this file so we can use it
import React from 'react';

// Bring StrictMode from React (helps catch mistakes while coding)
import { StrictMode } from 'react';

// Bring createRoot function (connects React to the real web page)
import { createRoot } from 'react-dom/client';

// Bring in our main App component (the starting point of our app)
import App from './App.jsx';

// Bring in our CSS file to style the app
import './App.css';

// Find the <div id="root"> in the HTML and put our React app inside it
createRoot(document.getElementById('root')).render(
  
  // Run our App in StrictMode (check for mistakes while developing)
  <StrictMode>
    <App /> {/* This is our main component */}
  </StrictMode>
);
