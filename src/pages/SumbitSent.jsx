import { useNavigate } from "react-router-dom";
import { crossImg, verImg } from "../assets/img";
import "/css/SubmitSent.css";
import { useEffect } from "react";

function SumbitSent() {
  const navigateTo = useNavigate();

  useEffect(() => {
    document.body.classList.add("body--blue");

    return () => {
      document.body.classList.remove("body--blue");
    };
  }, []);

  return (
    <div className="content-container">
      <img className="image" src={verImg}></img>
      <h2>נשלח בהצלחה </h2>
      <button className="back-button" onClick={() => navigateTo("/")}>
        חזרה לדף הראשי
      </button>
    </div>
  );
}

export default SumbitSent;
