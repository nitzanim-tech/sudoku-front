function checkCellValidity(fullArray, emptyCells) {
  let validCells = [];
  for (let i = 0; i < emptyCells.length; i++) {
    let row = emptyCells[i][0];
    let col = emptyCells[i][1];
    let validRow = true;
    let validCol = true;
    let validSubGrid = true;
    for (let j = 1; j <= 4; j++) {
      if (fullArray[row].filter((x) => x === j).length !== 1) {
        validRow = false;
        break;
      }
      if (fullArray.map((x) => x[col]).filter((x) => x === j).length !== 1) {
        validCol = false;
        break;
      }
    }
    
    let subGridRowStart = Math.floor(row / 2) * 2;
    let subGridColStart = Math.floor(col / 2) * 2;
    let subGridValues = [];
    for (let subRow = subGridRowStart; subRow < subGridRowStart + 2; subRow++) {
      for (
        let subCol = subGridColStart;
        subCol < subGridColStart + 2;
        subCol++
      ) {
        subGridValues.push(fullArray[subRow][subCol]);
      }
    }
    for (let j = 1; j <= 4; j++) {
      if (subGridValues.filter((x) => x === j).length !== 1) {
        validSubGrid = false;
        break;
      }
    }
    validCells.push(validRow && validCol && validSubGrid);
  }
  return validCells;
}

export { checkCellValidity };
