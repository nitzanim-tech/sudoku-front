import React, { useState, useEffect, useRef } from "react";
import { generateSudoku } from "../util/generateSudoku";
import { runScript } from "../requests/runScript";
import { SendForm, TestCard } from "../components";
import { useNavigate } from "react-router-dom";
/*
function importCSS(side) {
  let cssFile;
  if (side === 9) {
    cssFile = "./BigSuduku.css";
  } else {
    cssFile = "./SmallSuduku.css";
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssFile;
  document.head.appendChild(link);

  return () => {
    if (document.head.contains(link)) {
      document.head.removeChild(link);
    }
  };
}
*/

function Check() {
  const side = parseInt(localStorage.getItem("task")) || 4;
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
          generateSudoku(side, 5),
          generateSudoku(side, 10),
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
/*
  useEffect(() => {
    const removeCSS = importCSS(side);
    return () => {
      removeCSS();
    };
  }, [side]);
*/
useEffect(() => {
  if (side === 9) {
    import("./BigSuduku.css");
  } else {
    import("./SmallSuduku.css");
  }
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
    if (sent) {
      navigate("/sent");
    }
  }, [sent]);

  return (
    <div className="container">
      <div style={{ width: "70%" }}>
        <div className="grid">
          {sudokusRef.current.map((sudoku, index) => (
            <TestCard
              index={index}
              outputs={outputs}
              isValid={isValid}
              loading={loading}
              setIsValid={setIsValid}
              sudoku={sudoku}
            />
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
