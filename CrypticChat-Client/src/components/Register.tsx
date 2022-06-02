import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setToken } from "../redux/slices/userSlice";

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch()

  async function handleButtonClick() {
    let user = { username: username, email: email, password: password };

    let register = await axios.post<{email:string, username: string, token: string}>('http://localhost:80/api/User/register', user);
    console.log(register);
    window.localStorage.setItem("token", register.data.token)
    dispatch(setToken(register.data.token))
  }

  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} required />
      <input onChange={(e) => setEmail(e.target.value)} required />
      <input onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleButtonClick}>Register</button>
    </div>
  );
};

export default Register;
