import React from "react";  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
// Router = allows switching between pages without reloading

import Home from "./pages/Home/Home";     // Home page component
import Login from "./pages/Login/Login";  // Login page component
import SignUp from "./pages/SignUp/SignUp"; // SignUp page component

// All routes (paths) of the app are defined here
const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<Home />} />   // If URL is /dashboard → show Home page
      <Route path="/login" element={<Login />} />      // If URL is /login → show Login page
      <Route path="/signup" element={<SignUp />} />    // If URL is /signup → show SignUp page
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>; // App shows all the routes inside
};

export default App; // Make App available for other files

