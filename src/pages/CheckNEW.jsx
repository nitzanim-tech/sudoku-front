import React, { useState, useEffect, useRef } from "react";
import { generateSudoku } from "../util/generateSudoku";
import { crossImg, verImg } from "../assets/img";
import { runScript } from "../requests/runScript";
import { Card, CardContent, CircularProgress } from "@mui/material";
import { Sudoku, CheckedSudoku, SendForm } from "../components";
import { useNavigate } from "react-router-dom";
//import "./css/BigSuduku.css";

function importCSS(side) {
  let cssFile;
  if (side === 9) {
    console.log("in side=9");
    cssFile = "/css/BigSuduku.css";
  } else {
    cssFile = "/css/SmallSuduku.css";
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssFile;
  document.head.appendChild(link);
}

function Check({ side = 4 }) {
  const code = localStorage.getItem("code") || "";
  const sudokusRef = useRef(
    side === 4
      ? [
          generateSudoku(side, 2),
          generateSudoku(side, 1),
          generateSudoku(side, 5),
          generateSudoku(side, 3),
        ]
      : [
          generateSudoku(side, 10),
          generateSudoku(side, 1),
          generateSudoku(side, 20),
          generateSudoku(side, 40),
        ]
  );

  const [outputs, setOutputs] = useState([[], [], [], []]);
  const [isValid, setIsValid] = useState([false, false, false, false]);
  const [studentName, setStudentName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedInst, setSelectedInst] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const pass = isValid.every((value) => value === true);
  const formProps = {
    studentName,
    setStudentName,
    selectedRegion,
    setSelectedRegion,
    selectedInst,
    setSelectedInst,
    pass,
    setSent,
  };

  useEffect(() => {
    console.log("importCSS called with side:", side);
    importCSS(side);
  }, [side]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const outputs = await Promise.all(
        sudokusRef.current.map((sudoku) =>
          runScript({
            script: code,
            input: sudoku,
          })
        )
      );
      setOutputs(outputs);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("sent change(check)");
    if (sent) {
      navigate("/sent");
    }
  }, [sent]);

  return (
    <div className="container">
      <div style={{ width: "70%" }}>
        <div className="grid">
          {sudokusRef.current.map((sudoku, index) => (
            <Card key={index} className="card">
              {loading ? (
                <CircularProgress />
              ) : (
                <CardContent>
                  <div className="flex">
                    {outputs[index] === null ? (
                      <div style={{ width: "190px" }}>
                        <h2>פלט שגוי</h2>
                      </div>
                    ) : (
                      outputs[index].length > 0 && (
                        <div className="margin">
                          <p className="gray">פלט</p>
                          <CheckedSudoku
                            studentAns={outputs[index]}
                            sudoku={sudoku}
                            onValidityChange={(valid) => {
                              setIsValid((prevIsValid) => {
                                const newIsValid = [...prevIsValid];
                                newIsValid[index] = valid;
                                return newIsValid;
                              });
                            }}
                          />
                        </div>
                      )
                    )}

                    <div className="margin">
                      <p className="gray">טסט</p>
                      <Sudoku board={sudoku} />
                    </div>

                    <div className="margin">
                      <img
                        src={isValid[index] ? verImg : crossImg}
                        className="feedback-image"
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="center">
          <SendForm {...formProps} />
        </div>
      </div>
    </div>
  );
}

export default Check;
