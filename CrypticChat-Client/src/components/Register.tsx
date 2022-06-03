import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/slices/userSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  async function handleButtonClick() {
    let user = { username: username, email: email, password: password };

    let register = await axios.post<{
      email: string;
      username: string;
      token: string;
    }>("http://localhost:80/api/User/register", user);
    console.log(register);
    window.localStorage.setItem("token", register.data.token);
    dispatch(setToken(register.data.token));
  }

  return (
    <div className="min-h-screen pt-12 md:pt20 pb-6 px-2 md:px-0">
      <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <h3 className="font-bold text-2xl">Welcome to Chatify</h3>
        <p className="text-gray-600 pt-2">Sign in to your account.</p>
        <div className="mt-10 flex flex-col">
          <div className="mb-6  pt-3 rounded bg-gray-300">
            <label className="block text-gray-600 text-sm font-bold mb-2 ml-3">
              Username
            </label>
            <input
              className="bg-gray-300 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6  pt-3 rounded bg-gray-300">
            <label className="block text-gray-600 text-sm font-bold mb-2 ml-3">
              Email
            </label>
            <input
              className="bg-gray-300 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6  pt-3 rounded bg-gray-300">
            <label className="block text-gray-600 text-sm font-bold mb-2 ml-3">
              Password
            </label>
            <input
              className="bg-gray-300 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6  pt-3 rounded bg-gray-300">
            <label className="block text-gray-600 text-sm font-bold mb-2 ml-3">
              Confirm password
            </label>
            <input
              className="bg-gray-300 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transistion duration-200"
            onClick={handleButtonClick}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
