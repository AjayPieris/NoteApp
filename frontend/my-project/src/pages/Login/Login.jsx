import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box" />
            <button type="submit" className="btn-primary">
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
