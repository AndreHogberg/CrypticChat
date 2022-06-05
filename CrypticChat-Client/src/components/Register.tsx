import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../lib/agent";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/slices/userSlice";

const Register = () => {
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if(user.Authenticated){
      navigate("/", {replace: true})
    }
  },[user])


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  async function handleButtonClick() {
    let user = { username: username, email: email, password: password };
    
    if(confirmPassword === password){
      console.log(user);
      let register = await agent.Account.register(user);
      dispatch(loginUser(register));
    }

  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-300 to-blue-300 pt-2 md:pt20 pb-6 px-2 md:px-0">
      <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <h3 className="font-bold text-2xl">Welcome to Chatify</h3>
        <p className="text-gray-300 pt-2">Register your account.</p>
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
              Email
            </label>
            <input
              className="bg-gray-200 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mb-6  pt-3 rounded bg-gray-200">
            <label className="block text-gray-300 text-sm font-bold mb-2 ml-3">
              Confirm password
            </label>
            <input
              className="bg-gray-200 rounded w-full focus:outline-none border-b-4 border-gray-100 focus:border-purple-600 transition duration-500 px-3 pb-3"
              type={"password"}
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
