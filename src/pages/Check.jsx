import React, { useState, useEffect, useRef } from "react";
import { generateSudoku } from "../util/generateSudoku";
import { crossImg, verImg } from "../assets/img";
import { runScript } from "../requests/runScript";
import { Card, CardContent } from "@mui/material";
import { Sudoku, CheckedSudoku, SendForm } from "../components";
import { useNavigate } from "react-router-dom";

import "./Check.css";

function Check() {
  const code = localStorage.getItem("code") || "";
  const sudokusRef = useRef([
    generateSudoku(3),
    generateSudoku(1),
    generateSudoku(7),
    generateSudoku(5),
  ]);
  const [outputs, setOutputs] = useState([[], [], [], []]);
  const [isValid, setIsValid] = useState([false, false, false, false]);
  const [studentName, setStudentName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedInst, setSelectedInst] = useState("");
  const [sent, setSent] = useState(false);
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

  useEffect(() => {
    console.log("sent change(check)");
    if (sent) {
      navigate("/sent");
    }
  }, [sent]);

  return (
    <div className="container">
      <div className="grid">
        {sudokusRef.current.map((sudoku, index) => (
          <Card key={index} className="card">
            <CardContent>
              <div className="flex">
                {outputs[index] === null ? (
                  <div className="margin">
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
          </Card>
        ))}
      </div>

      <div className="center">
        <SendForm {...formProps} />
      </div>
    </div>
  );
}

export default Check;
