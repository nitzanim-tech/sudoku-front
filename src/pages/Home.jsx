import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import { getStudentPass } from "../requests/getStdntsPass";
import { formatDate } from "../util/formatDate";
import { ConfirmationDialog, FameWall, Guidelines } from "../components";
import Timer from "../components/homePage/Timer";
import { useTimer } from "react-timer-hook";

import "./Home.css";

function Home() {
  const navigateTo = useNavigate();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [challengeStudents, setChallengeStudents] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  const fetchAndFormatStudents = async (task) => {
    const data = await getStudentPass(task);
    console.log(data);
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const formattedData = sortedData.map((student) => ({
      ...student,
      date: formatDate(student.date),
    }));
    return formattedData;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const basicData = await fetchAndFormatStudents("basic-sudoku");
      setStudents(basicData);

      const challengeData = await fetchAndFormatStudents("challenge-sudoku");
      setChallengeStudents(challengeData);
    };
    fetchStudents();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    navigateTo("/submit");
  };
  const handleClickToFW = () => {
    navigateTo("/famewall");
  };

  //const targetDate = Date.parse("2023-06-25T10:00:00+03:00");
  const targetDate = Date.parse("2023-06-22T23:34:00+03:00");
  const timer = useTimer({
    expiryTimestamp: targetDate,
    onExpire: () => setShowButtons(true),
  });

  return (
    <>
      <img src={logoImg}></img>
      {showButtons ? (
        <>
          <Guidelines />
          <button className="home-button" onClick={handleClickOpen}>
            להגשה
          </button>
          <button className="home-button" onClick={handleClickToFW}>
            לקיר התהילה
          </button>
        </>
      ) : (
        <div className="timer-container">
          <h1>:אנחנו מתחילים עוד</h1>
          <Timer targetDate={targetDate} />
          <h3>ראשון | 25.06.23 | 10:00</h3>
        </div>
      )}

      <div className="blue-container">
        <div className="container">
          <div style={{ marginRight: "20px", flex: "1" }}>
            <h3 style={{ color: "white" }}>אתגר-לוח גדול</h3>
            <FameWall students={challengeStudents} />
          </div>
          <div
            style={{
              backgroundColor: "white",
              width: "2px",
              height: "100%",
            }}
          />
          <div style={{ flex: "1" }}>
            <h3 style={{ color: "white" }}>משימה-לוח קטן</h3>
            <FameWall students={students} />
          </div>
        </div>
      </div>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onAgree={handleAgree}
      />
    </>
  );
}

export default Home;
