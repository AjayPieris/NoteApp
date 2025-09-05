import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Passwordinput from "../../components/input/Passwordinput";
import { ValidateEmail } from "../../utils/helper";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance"; // ✅ make sure this file exists

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!ValidateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      // 🚀 Send signup request to backend
      const response = await axiosInstance.post("/create-account", {
        fullName: name, // User's name
        email: email, // User's email
        password: password, // User's password
      });

      // ❌ If server sends back an error
      if (response.data && response.data.error) {
        setError(response.data.message); // Show error message
        return; // Stop here (don’t continue)
      }

      // ✅ If signup success & token received
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken); // Save token
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      // ❌ If request fails (server down, no internet, etc.)
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Signup failed"); // Show server error
      } else {
        setError("Something went wrong. Please try again later."); // Show fallback error
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-bold mb-7 text-center">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button type="submit" className="btn-primary w-full mt-4">
              Sign Up
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
