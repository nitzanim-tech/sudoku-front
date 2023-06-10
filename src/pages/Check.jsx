import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { generateSudoku } from "../util/generateSudoku";
import SudokuTable from "../components/SudukuTable";
import CheckedSudokuTable from "../components/CheckedSudokuTable";
import crossImg from "../assets/img/cross.png";
import verImg from "../assets/img/verified.png";
import SendForm from "../components/SendForm";
import { runScript } from "../requests/runScript";

function Check() {
  const location = useLocation();
  const code = location.state.code;
  const sudukuRef = useRef(generateSudoku());
  const [output, setOutput] = useState([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const output = await runScript({
        script: code,
        input: sudukuRef.current,
      });
      setOutput(JSON.parse(output));
    }
    fetchData();
  }, []);

  return (
    <>
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
              <img
                src={isValid ? verImg : crossImg}
                className="feedback-image"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <SendForm />
    </>
  );
}

export default Check;
