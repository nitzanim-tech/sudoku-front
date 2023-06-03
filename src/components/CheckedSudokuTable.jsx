import React from "react";
import { findEmptyCells } from "../util/findEmptyCells";
import { checkCellValidity } from "../util/isValid";

const CheckedSudokuTable = ({ studentAns, sudoku }) => {
  console.log(studentAns);
  const emptyCells = findEmptyCells(sudoku);
  const validCells = checkCellValidity(studentAns, emptyCells);

  console.log(emptyCells);
  console.log(validCells);

  return (
    <table className="sudoku-table">
      <tbody>
        {studentAns.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const cellIndex = emptyCells.findIndex(
                ([rowIndex, colIndex]) => rowIndex === i && colIndex === j
              );
              const isValid = cellIndex !== -1 ? validCells[cellIndex] : true;
              return (
                <td
                  key={j}
                  style={{
                    backgroundColor:
                      cellIndex !== -1
                        ? isValid
                          ? "#b3ff99"
                          : "#ff9999"
                        : undefined,
                  }}
                >
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CheckedSudokuTable;
