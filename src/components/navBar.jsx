import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/config";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import navBar from "/Favicon.png";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true }); //For a POST request, Axios expects the second argument to be the data sent to the server.so {}
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);
  return (
    <div className="navbar bg-gray-900 text-white shadow-md sticky top-0 z-50 px-6">
      {/* Left: Logo */}
      <div className="flex-1 flex items-center gap-3">
        {/* Professional logo image */}
        <img
          src={navBar} // replace with your brand logo
          alt="DevTinder Logo"
          className="w-10 h-10 rounded-md"
        />
        <Link to="/" className="text-xl sm:text-2xl font-bold text-white">
          DevTinder
        </Link>
      </div>

      {/* Right: User menu */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden sm:flex items-center text-gray-200 font-medium">
            Welcome,{" "}
            <span className="ml-1 font-semibold text-white">
              {user.firstName}
            </span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-gray-500 hover:ring-indigo-500 transition"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img alt="User Avatar" src={user.profilePicture} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-gray-100 rounded-lg mt-3 w-52 p-2 shadow-lg border border-gray-700"
            >
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-gray-700 hover:text-white transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-gray-700 hover:text-white transition"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:bg-gray-700 hover:text-white transition"
                >
                  Requests
                </Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="hover:bg-red-600 hover:text-white transition cursor-pointer"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
