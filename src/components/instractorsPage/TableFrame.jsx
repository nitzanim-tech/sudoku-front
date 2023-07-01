import React from "react";
import { TableBody, TableCell, TableContainer } from "@mui/material";
import { Table, TableHead, TableRow, Paper } from "@mui/material";
import MainTable from "../../components/instractorsPage/MainTable";

function TableFrame({ students }) {
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
  );
}

export default TableFrame;
