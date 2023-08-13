import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/img/logo.png";
import { getStudentPass } from "../requests/getStdntsPass";
import { formatDate } from "../util/formatDate";
import { ConfirmationDialog, FameWall, Guidelines } from "../components";
import Timer from "../components/homePage/Timer";
import { useTimer } from "react-timer-hook";
import useAnalyticsEventTracker from '../util/useAnalyticsEventTracker';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';

import "./Home.css";

const formatData = (data) => {
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const formattedData = sortedData.map((student) => ({
    ...student,
    date: formatDate(student.date),
  }));
  return formattedData;
};

function Home() {
  const navigateTo = useNavigate();
  const [open, setOpen] = useState(false);
  const [basicStudents, setBasicStudents] = useState([]);
  const [challengeStudents, setChallengeStudents] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  
  const gaEventTracker = useAnalyticsEventTracker('Home');

  useEffect(() => {
    const fetchStudents = async () => {
      const tasks = ['basic-sudoku', 'challenge-sudoku'];
      const data = await getStudentPass(tasks);
      setBasicStudents(formatData(data[tasks[0]]));
      setChallengeStudents(formatData(data[tasks[1]]));
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
    gaEventTracker('agree')
    navigateTo('/submit');
  };
  const handleClickToFW = () => {
    navigateTo('/famewall');
  };

  const targetDate = Date.parse('2023-08-15T20:00:00+03:00');
  const timer = useTimer({
    expiryTimestamp: targetDate,
    onExpire: () => setShowButtons(true),
  });


const ParentDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

  return (
    <>
      <ParentDiv>
        <div className="timer-container">
          <h2>:האתר נסגר להגשות עוד</h2>
          <Timer targetDate={targetDate} />
          <h3>שלישי | 15.08.23 | 20:00</h3>
        </div>
          <Divider orientation="vertical" flexItem/>

        <div className="vertical-layout">
          <img src={logoImg}></img>
          <h1>משימה/אתגר קיץ</h1>
          <Guidelines />
        </div>
      </ParentDiv>

      <button className="home-button" onClick={handleClickOpen}>
        להגשה
      </button>
      <button className="home-button" onClick={handleClickToFW}>
        לקיר התהילה
      </button>

      <div className="blue-container">
        <div className="container" style={{ flexDirection: 'row' }}>
          <div style={{ marginRight: '20px', flex: '1' }}>
            <h3 style={{ color: 'white' }}>אתגר-לוח גדול</h3>
            <FameWall students={challengeStudents} />
          </div>
          <div
            style={{
              backgroundColor: 'white',
              width: '2px',
              height: '100%',
            }}
          />
          <div style={{ flex: '1' }}>
            <h3 style={{ color: 'white' }}>משימה-לוח קטן</h3>
            <FameWall students={basicStudents} />
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
