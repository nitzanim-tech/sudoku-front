import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";

function SumbitSent() {
  const navigateTo = useNavigate();

  return (
    <>
      <img src={logoImg}></img>
      <h2>נשלח בהצלחה </h2>
      <button
        style={{ backgroundColor: "#008AD1", color: "white" }}
        onClick={() => navigateTo("/")}
      >
        חזרה לדף הראשי
      </button>
      <div
        style={{
          backgroundColor: "#003061",
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      >
        <h2 style={{ color: "white" }}>קיר התהילה</h2>
      </div>
    </>
  );
}

export default SumbitSent;
