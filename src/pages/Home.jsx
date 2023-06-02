import { useState } from "react";
import { generateSudoku } from "../util/generateSudoku";
import { runPython } from "../util/RunPython";

import SudokuTable from "../components/SudukuTable";

function Home() {
  const [count, setCount] = useState(0);
  const board = generateSudoku();
  console.log(board);
  const answer = runPython("C:Users/hagbi/Desktop/pythonProject/combined.py", [
    [None, 3, None, 1],
    [2, 1, 4, 3],
    [3, 2, 1, None],
    [1, 4, None, None],
  ]);
  console.log(answer);

  return (
    <>
      <h1>Home</h1>
      <SudokuTable board={board} />;<button>Check</button>
    </>
  );
}

export default Home;
