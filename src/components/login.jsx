import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error("Login failed:", err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="relative w-full max-w-md">
        {/* Optional floating accent circles */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-full opacity-30 blur-3xl"></div>

        <div className="card bg-gray-800 shadow-2xl rounded-3xl overflow-hidden border border-gray-700">
          <div className="card-body p-8">
            <h2 className="card-title justify-center text-3xl font-extrabold text-white mb-6 drop-shadow-lg">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>

            {!isLoginForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="form-control w-full">
                  <span className="label-text text-gray-200 font-semibold">
                    First Name
                  </span>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full focus:border-indigo-500 focus:ring focus:ring-indigo-300 bg-gray-700 text-white placeholder-gray-400 transition"
                    placeholder="Enter first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full">
                  <span className="label-text text-gray-200 font-semibold">
                    Last Name
                  </span>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full focus:border-indigo-500 focus:ring focus:ring-indigo-300 bg-gray-700 text-white placeholder-gray-400 transition"
                    placeholder="Enter last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            )}

            <label className="form-control w-full mt-4">
              <span className="label-text text-gray-200 font-semibold">
                Email ID
              </span>
              <input
                type="text"
                value={email}
                className="input input-bordered w-full focus:border-indigo-500 focus:ring focus:ring-indigo-300 bg-gray-700 text-white placeholder-gray-400 transition"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-control w-full mt-4">
              <span className="label-text text-gray-200 font-semibold">
                Password
              </span>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full focus:border-indigo-500 focus:ring focus:ring-indigo-300 bg-gray-700 text-white placeholder-gray-400 transition"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

            <div className="card-actions justify-center mt-6">
              <button
                className="btn btn-gradient w-full sm:w-auto px-8 py-2 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-105 transition-transform"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>

            <p
              className="text-center mt-4 cursor-pointer text-indigo-400 hover:text-indigo-500 underline transition"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Sign Up Here"
                : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
