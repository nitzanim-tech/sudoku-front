import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import FameWall from "../components/FameWall";

import { students } from "../util/exampleJsons";
function Home() {
  const navigateTo = useNavigate();

  return (
    <>
      <img src={logoImg}></img>
      <h2>הנחיות הגשה</h2>
      <p>
        אדון וגברת דַרְסְלִי, דיירי דרך פְּרִיוֶוט מספר ארבע, ידעו לדווח בגאווה
        שהם נורמליים לגמרי ותודה ששאלתם. לא יעלה על הדעת כי מכל האנשים בעולם
        דווקא הם יסתבכו בפרשיות מוזרות או מסתוריות, והרי הם פשוט לא סובלים
        שטויות מסוג זה. מר דַרסְלי היה מנכ"ל של חברה בשם גְרַאנִינְגְס לייצור
        מקדחות. הוא היה איש גדל-ממדים, בשרני, וכמעט נטול צוואר למרות שדווקא היה
        לו שפם שמן למדי. גברת דַרסְלי היתה רזה ובלונדינית, ולה היה צוואר ארוך
        פי-שניים מהאורך המקובל, מה שהיה שימושי מאוד, כי רוב זמנה עבר עליה בהצצה
        מעל גדרות כדי לרגל אחר השכנים שלה. לַדַרסְלים היה תינוק ששמו דַאדְלִי,
        ובעיניהם לא היה בעולם ילד מוצלח ממנו.
      </p>

      <button
        style={{ backgroundColor: "#008AD1", color: "white" }}
        onClick={() => navigateTo("/submit")}
      >
        להגשה
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
        <FameWall students={students} />
      </div>
    </>
  );
}

export default Home;
