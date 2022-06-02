import React, { useState } from "react";

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

async function handleButtonClick(e) {
  e.preventdefault();
  let user = { username, password };

  let result = await fetch("https://localhost:XXXXX/api/Login", {
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  result = await result.json();
}

const Login = () => {
  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} required />
      <input onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleButtonClick}>Login</button>
    </div>
  );
};

export default Login;
