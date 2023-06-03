import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";

function Home() {
  const navigateTo = useNavigate();

  return (
    <>
      <img src={logoImg}></img>
      <h2>הנחיות הגשה</h2>
      <p>בלה בלה בלה</p>
      <button onClick={() => navigateTo("/submit")}>להגשה</button>
    </>
  );
}

export default Home;
