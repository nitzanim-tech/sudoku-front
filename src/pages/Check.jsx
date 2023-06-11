import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { generateSudoku } from "../util/generateSudoku";
import SudokuTable from "../components/Suduku";
import CheckedSudokuTable from "../components/CheckedSudoku";
import crossImg from "../assets/img/cross.png";
import verImg from "../assets/img/verified.png";
import SendForm from "../components/SendForm";
import { runScript } from "../requests/runScript";
import { Card, CardContent } from "@mui/material";

function Check() {
  const location = useLocation();
  const code = location.state.code;
  const sudokusRef = useRef([
    generateSudoku(3),
    generateSudoku(1),
    generateSudoku(7),
    generateSudoku(5),
  ]);
  const [outputs, setOutputs] = useState([[], [], [], []]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const outputs = await Promise.all(
        sudokusRef.current.map((sudoku) =>
          runScript({
            script: code,
            input: sudoku,
          })
        )
      );
      setOutputs(outputs);
    }
    fetchData();
  }, []);

  return (
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {sudokusRef.current.map((sudoku, index) => (
          <Card key={index} style={{ maxWidth: 420 }}>
            <CardContent>
              <div style={{ display: "flex" }}>
                {outputs[index] === null ? (
                  <div style={{ margin: "0 8px" }}>
                    <h2>פלט שגוי</h2>
                  </div>
                ) : (
                  outputs[index].length > 0 && (
                    <div style={{ margin: "0 8px" }}>
                      <p style={{ color: "gray" }}>פלט</p>
                      <CheckedSudokuTable
                        studentAns={outputs[index]}
                        sudoku={sudoku}
                        onValidityChange={setIsValid}
                      />
                    </div>
                  )
                )}

                <div style={{ margin: "0 8px" }}>
                  <p style={{ color: "gray" }}>טסט</p>
                  <SudokuTable board={sudoku} />
                </div>

                <div style={{ margin: "0 8px" }}>
                  <img
                    src={isValid ? verImg : crossImg}
                    className="feedback-image"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SendForm />
      </div>
    </div>
  );
}

export default Check;
