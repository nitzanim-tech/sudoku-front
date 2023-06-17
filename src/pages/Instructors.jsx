import React from "react";
import { useState, useEffect } from "react";
import { Card, TableBody, TableCell, TableContainer } from "@mui/material";
import { Table, TableHead, TableRow, Paper } from "@mui/material";
import MainTable from "../components/instractorsPage/MainTable";
import SelectInst from "../components/SelectInst";
import logoImg from "../assets/img/logo.png";

function Instructors() {
  const [students, setStudents] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedInst, setSelectedInst] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/student/get?instId=${selectedInst}`
      );
      let data = await response.json();
      data = data.map((student) => ({ ...student, id: student._id }));
      setStudents(data);
    }
    fetchData();
  }, [selectedInst]);

  const handleDownload = (code, name) => {
    const fileName = `${name.replace(/ /g, "_")}.py`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <div
      style={{
        width: "700px",
      }}
    >
      <img src={logoImg} alt="Logo" />
      <Card style={{ margin: "20px" }}>
        <SelectInst
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          selectedInst={selectedInst}
          setSelectedInst={setSelectedInst}
        />
      </Card>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <b>הגשה אחרונה</b>
              </TableCell>
              <TableCell>
                <b>קובץ אחרון</b>
              </TableCell>
              <TableCell>
                <b>טסטים</b>
              </TableCell>
              <TableCell>
                <b>שם</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <tr>
              <td dir="rtl">
                <b>משימה</b>
              </td>
            </tr>
            {students.map((student) => (
              <MainTable
                key={student.id}
                row={student}
                handleDownload={handleDownload}
                task="basic-sudoku"
              />
            ))}
          </TableBody>
          <TableBody>
            <tr>
              <td dir="rtl">
                <b>אתגר</b>
              </td>
            </tr>
            {students.map((student) => (
              <MainTable
                key={student.id}
                row={student}
                handleDownload={handleDownload}
                task="challenge-sudoku"
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Instructors;
