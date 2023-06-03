const SudokuTable = ({ board }) => {
  console.log("in SudokuTable:");
  console.log(board);

  return (
    <table className="sudoku-table">
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SudokuTable;
