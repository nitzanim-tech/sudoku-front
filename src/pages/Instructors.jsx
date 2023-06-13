import React from "react";
import { useState, useEffect } from "react";
import { TableBody, TableCell, TableContainer } from "@mui/material";
import { Table, TableHead, TableRow, Paper } from "@mui/material";
import MainTable from "../components/instractors/MainTable";
import SelectInst from "../components/SelectInst";

function Instructors() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3000/student/get/6484c5d0a65864b3b39057a7"
      );
      let data = await response.json();
      data = data.map((student) => ({ ...student, id: student._id }));
      console.log(data);
      setStudents(data);
    }
    fetchData();
  }, []);

  const handleDownload = (code, name) => {
    console.log(name);
    const fileName = `${name.replace(/ /g, "_")}.py`;
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <SelectInst />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>הגשה אחרונה</TableCell>
              <TableCell>קובץ אחרון</TableCell>
              <TableCell>טסטים</TableCell>
              <TableCell>שם</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <MainTable
                key={student.id}
                row={student}
                handleDownload={handleDownload}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Instructors;
