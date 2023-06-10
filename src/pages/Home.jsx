import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import FameWall from "../components/FameWall";
function Home() {
  const navigateTo = useNavigate();

  return (
    <>
      <img src={logoImg}></img>
      <h2>הנחיות הגשה</h2>
      <p>בלה בלה בלה</p>
      <button onClick={() => navigateTo("/submit")}>להגשה</button>
      <h2>קיר התהילה</h2>

      <FameWall />
    </>
  );
}

export default Home;
