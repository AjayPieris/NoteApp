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
      // ✅ Send signup request
      const response = await axiosInstance.post("/create-account", {
        fullName: name, 
        email: email,
        password: password,
      });

      if(response.data && response.data.error){
        setError(response.data.message);
        return;
      }

      // ✅ Save token & redirect
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Signup failed");
      } else {
        setError("Something went wrong. Please try again later.");
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
