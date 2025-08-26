import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Passwordinput from "../../components/input/Passwordinput";
import { ValidateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance"; // ✅ make sure this file exists

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Stop page refresh

    // ✅ Frontend validation
    if (!ValidateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(""); // clear error before request

    try {
      // ✅ Send login request
      const response = await axiosInstance.post("/login", { email, password });

      // ✅ Save token
     if(response.data && response.data.accessToken){
       localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
     }
    } catch (error){
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
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

            {/* Error message */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            {/* Submit button */}
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
