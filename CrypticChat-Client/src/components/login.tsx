import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import agent from '../lib/agent'
import { useAppSelector } from "../redux/hooks";
import  { loginUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";


const Login = () => {
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if(user.Authenticated){
      navigate("/", {replace: true})
    }
  },[user])

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  async function handleButtonClick() {
    let user = { email: username, password: password };
    let userDetails = await agent.Account.login(user);
    if(userDetails){
      dispatch(loginUser(userDetails));
    }
  }
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-300 to-blue-300 pt-12 md:pt20 pb-6 px-2 md:px-0">
      <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <h3 className="font-bold text-2xl">Welcome to CrypticChat</h3>
        <p className="text-gray-300 pt-2">Sign in to your account.</p>
        <div className="mt-10 flex flex-col">
          <div className="mb-6  pt-3 rounded bg-gray-200">
            <label className="block text-gray-300 text-sm font-bold mb-2 ml-3">
              Username
            </label>
            <input
              className="bg-gray-200 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6  pt-3 rounded bg-gray-200">
            <label className="block text-gray-300 text-sm font-bold mb-2 ml-3">
              Password
            </label>
            <input
              className="bg-gray-200 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <label className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">
              Forgot your password?
            </label>
          </div>

          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transistion duration-200"
            onClick={handleButtonClick}
          >
            Login
          </button>
        </div>
      </div>
      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white text-sm font-bold">Dont have an account? </p>
        <Link
          to={"/register"}
          className="text-white text-sm font-bold hover:underline"
        >
          Sign up!
        </Link>
      </div>
    </div>
  );
};

export default Login;
