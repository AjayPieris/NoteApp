import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Passwordinput from "../../components/input/Passwordinput";
import { ValidateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";


function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return
    }
    if (!ValidateEmail(email)) {
      setError("Please enter valid email");
      return
    }
    if (!password) {
      setError("Please enter the password");
      return
    }

    setError("");

    //signUp API Call
   
  };
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28 ">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-bold mb-7 text-center">SignUp</h4>
            <input type="text" 
            placeholder="Name" 
            className="input-box" 
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email} // display the value stored in email
              onChange={(e) => setEmail(e.target.value)} // display the value stored in email
            />
            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


            <button type="submit" className="btn-primary">
              SignUp
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{""}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
              {/* <Link>
👉 This is like an <a> (anchor) tag, but it comes from React Router.
🔄 It’s used to go to another page without refreshing the browser. */}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
