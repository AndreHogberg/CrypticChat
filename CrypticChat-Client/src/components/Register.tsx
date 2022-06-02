import React, { useState } from "react";

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

async function handleButtonClick(e) {
  e.preventdefault();
  let user = { username, email, password };

  let result = await fetch("https://localhost:XXXXX/api/Register", {
    method: "POST",
    headers: {
      Accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  result = await result.json();
}

const Register = () => {
  return (
    <div>
      <input onChange={(e) => setUsername(e.target.value)} required />
      <input onChange={(e) => setEmail(e.target.value)} required />
      <input onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleButtonClick}>Login</button>
    </div>
  );
};

export default Register;
