import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar"; // Top navigation bar
import { Link, useNavigate } from "react-router-dom"; // For navigation & page links
import Passwordinput from "../../components/input/Passwordinput"; // Custom password field
import { ValidateEmail } from "../../utils/helper"; // Function to check email format
import axiosInstance from "../../utils/axiosinstance"; // Axios setup for API requests

function Login() {
  // ✅ State variables (store user input and error messages)
  const [email, setEmail] = useState("");     
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null);    

  const navigate = useNavigate(); // Used to move to another page (e.g., /dashboard)

  // ✅ Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    // --- Frontend Validation ---
    if (!ValidateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(""); // Clear previous error before sending request

   try {
  // Send login request with email & password
  const response = await axiosInstance.post("/login", { email, password });

  // If login is successful and token is received
  if (response.data && response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken); // Save token in browser
    navigate("/dashboard"); // Redirect to dashboard
  }
} catch (error) {
  // If login failed
  if (error.response && error.response.data) {
    setError(error.response.data.message || "Login failed"); // Show server error message
  } else {
    setError("Something went wrong. Please try again later."); // Show general error
  }
}}

  return (
    <div>
      <Navbar /> {/* Navigation bar at top */}

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          
          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-bold mb-7 text-center">Login</h4>

            {/* Email input */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password input */}
            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error message display */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Login button */}
            <button type="submit" className="btn-primary w-full mt-4">
              Login
            </button>

            {/* Signup link */}
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
