import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentPass } from "../requests/getStdntsPass";
import { getRegions } from "../requests/getRegions";
import { formatDate } from "../util/formatDate";
import {  FameWall } from "../components";

function RegionalFameWall() {
  const navigateTo = useNavigate();
  const [regions, setRegions] = useState([]);
  const [studentsByRegion, setStudentsByRegion] = useState({});

  const fetchAndFormatStudents = async (task, region) => {
    const data = await getStudentPass(task, region);
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
    const formattedData = sortedData.map((student) => ({
      ...student,
      date: formatDate(student.date),
    }));
    return formattedData;
  };

  useEffect(() => {
    const fetchRegionsAndStudents = async () => {
      const regionsData = await getRegions();
      setRegions(regionsData);

      const studentsByRegionData = {};
      for (const region of regionsData) {
        studentsByRegionData[region.name] = {
          basic: await fetchAndFormatStudents("basic-sudoku", region.name),
          challenge: await fetchAndFormatStudents(
            "challenge-sudoku",
            region.name
          ),
        };
      }
      setStudentsByRegion(studentsByRegionData);
    };
    fetchRegionsAndStudents();
  }, []);

  const handleClick = () => {
    navigateTo("/");
  };


  return (
    <>
      <button
        style={{
          backgroundColor: "#008AD1",
          color: "white",
          marginBottom: "20px",
        }}
        onClick={handleClick}
      >
        חזרה לעמוד הראשי
      </button>

      {regions.map((region, index) => (
        <div
          key={region.id}
          style={{
            backgroundColor: index % 2 === 0 ? "#003061" : "white",
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            paddingTop: "20px",
          }}
        >
          <h2 style={{ color: index % 2 === 0 ? "white" : "#003061" }}>
            {region.name}
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginRight: "20px", flex: "1" }}>
              <h3 style={{ color: index % 2 === 0 ? "white" : "#003061" }}>
                אתגר-לוח גדול
              </h3>
              <FameWall students={studentsByRegion[region.name]?.challenge} />
            </div>
            <div
              style={{
                backgroundColor: index % 2 === 0 ? "white" : "#003061",
                width: "2px",
                height: "100%",
              }}
            />
            <div style={{ flex: "1" }}>
              <h3 style={{ color: index % 2 === 0 ? "white" : "#003061" }}>
                משימה-לוח קטן
              </h3>
              <FameWall students={studentsByRegion[region.name]?.basic} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default RegionalFameWall;
