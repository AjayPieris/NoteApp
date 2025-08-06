import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import Passwordinput from "../../components/input/Passwordinput";
import { ValidateEmail } from "../../utils/helper";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault(); // Stop the form from refreshing the page

    if (!ValidateEmail(email)) {
      setError("please enter a valid email");
      return;
    }
    if(!password) {
      setError("Please enter the password");
      return;
    }

    setError("")
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28 ">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-bold mb-7 text-center">Login</h4>
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

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button type="submit" className="btn-primary" >
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered Yet?{""}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
              {/* <Link>
👉 This is like an <a> (anchor) tag, but it comes from React Router.
🔄 It’s used to go to another page without refreshing the browser. */}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
