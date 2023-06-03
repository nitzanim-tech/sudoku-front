import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { generateSudoku } from "../util/generateSudoku";
import SudokuTable from "../components/SudukuTable";
import CheckedSudokuTable from "../components/CheckedSudokuTable";
import crossImg from "../assets/img/cross.png";
import verImg from "../assets/img/verified.png";

function Check() {
  const location = useLocation();
  const code = location.state.code;
  const sudukuRef = useRef(generateSudoku());
  const [output, setOutput] = useState([]);
  const [isValid, setIsValid] = useState(false);

  console.log("IN CHECK");

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("IN USE EFFECT");

        const response = await fetch("http://localhost:3000/run-script", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ script: code, input: sudukuRef.current }),
        });
        const output = await response.text();
        console.log(output);
        console.log(sudukuRef.current);

        setOutput(JSON.parse(output));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <h2>טסט</h2>
          </td>
          <td>
            <h2>פלט</h2>
          </td>
        </tr>

        <tr>
          <td>
            <SudokuTable board={sudukuRef.current} />
          </td>
          <td>
            {output.length > 0 && (
              <CheckedSudokuTable
                studentAns={output}
                sudoku={sudukuRef.current}
                onValidityChange={setIsValid}
              />
            )}
          </td>
          <td>
            <img src={isValid ? verImg : crossImg} className="feedback-image" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Check;
