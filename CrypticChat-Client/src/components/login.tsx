import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleButtonClick() {
    let user = { email: username, password: password };
    console.log(user);
    
    let result = await fetch("http://localhost:80/api/User/login", {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    result = await result.json();
  }
  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} required />
      <input onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleButtonClick}>Login</button>
    </div>
  );
};

export default Login;
