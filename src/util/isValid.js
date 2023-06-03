function checkCellValidity(fullArray, emptyCells) {
  let validCells = [];
  for (let i = 0; i < emptyCells.length; i++) {
    let row = emptyCells[i][0];
    let col = emptyCells[i][1];
    let validRow = true;
    let validCol = true;
    for (let j = 1; j <= 4; j++) {
      console.log(fullArray);
      if (fullArray[row].filter((x) => x === j).length !== 1) {
        validRow = false;
        break;
      }
      if (fullArray.map((x) => x[col]).filter((x) => x === j).length !== 1) {
        validCol = false;
        break;
      }
    }
    validCells.push(validRow && validCol);
  }
  return validCells;
}

export { checkCellValidity };
