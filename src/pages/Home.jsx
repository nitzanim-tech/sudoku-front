import { useState } from "react";
import { generateSudoku } from "../util/generateSudoku";
import SudokuTable from "../components/SudukuTable";

function Home() {
  const [count, setCount] = useState(0);
  const board = generateSudoku();
  console.log(board);
  const answer = fetch("/run-script", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ script, input }),
  })
    .then((response) => response.text())
    .then((output) => {
      console.log(output);
    });


  return (
    <>
      <h1>Home</h1>
      <SudokuTable board={board} />;<button>Check</button>
    </>
  );
}

export default Home;
