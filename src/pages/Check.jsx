import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { generateSudoku } from "../util/generateSudoku";
import SudokuTable from "../components/SudukuTable";
import crossImg from "../assets/img/cross.png";

function Check() {
  const location = useLocation();
  const code = location.state.code;
  const sudukuRef = useRef(generateSudoku());
  const [output, setOutput] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/run-script", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ script: code, input: sudukuRef.current }),
        });
        const output = await response.text();
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
            <SudokuTable board={output} />
          </td>
          <td>
            <img src={crossImg} className="feedback-image" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Check;
