import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import { getStudentPass } from "../requests/getStdntsPass";
import { formatDate } from "../util/formatDate";
import { ConfirmationDialog, FameWall, Guidelines } from "../components";

function Home() {
  const navigateTo = useNavigate();
  const [students, setStudents] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudentPass();
      const formattedData = data.map((student) => ({
        ...student,
        date: formatDate(student.date),
      }));
      setStudents(formattedData);
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

  return (
    <>
      <img src={logoImg}></img>
      <Guidelines />
      <button
        style={{ backgroundColor: "#008AD1", color: "white" }}
        onClick={handleClickOpen}
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
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onAgree={handleAgree}
      />
    </>
  );
}

export default Home;
