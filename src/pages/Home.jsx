import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import { getStudentPass } from "../requests/getStdntsPass";
import { formatDate } from "../util/formatDate";
import { ConfirmationDialog, FameWall, Guidelines } from "../components";

function Home() {
  const navigateTo = useNavigate();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [challengeStudents, setChallengeStudents] = useState([]);

  const fetchAndFormatStudents = async (task) => {
    const data = await getStudentPass(task);
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

    return (
      <>
        <img src={logoImg}></img>
        <Guidelines />
        <button
          style={{
            backgroundColor: "#008AD1",
            color: "white",
            marginBottom: "20px",
          }}
          onClick={handleClickOpen}
        >
          להגשה
        </button>
        <button
          style={{
            backgroundColor: "#008AD1",
            color: "white",
            marginBottom: "20px",
            marginLeft: "20px",
          }}
          onClick={handleClickToFW}
        >
          לקיר התהילה
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
            paddingTop: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
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
