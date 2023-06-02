import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigateTo = useNavigate();

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => navigateTo("/")}>Home</button>
    </>
  );
}

export default Login;
