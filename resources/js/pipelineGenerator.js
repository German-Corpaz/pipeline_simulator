import * as utilities from './utilities.js';
export function getMatrixWithoutPipelining(result) {
  let instructions = result.executedInstructions;
  let amountOfInstructionsExecuted = instructions.length;

  let matrix = utilities.createMatrix(
    amountOfInstructionsExecuted,
    amountOfInstructionsExecuted * 8
  );
  let cycle = 0;

  for (let i = 0; i < instructions.length; i++) {
    for (let k = 0; k < cycle; k++) {
      matrix[i].push(null);
    }
    matrix[i].push('F');
    cycle++;
    matrix[i].push('D');
    cycle++;
    if (
      instructions[i].mnemonic == 'MUL' ||
      instructions[i].mnemonic == 'DIV' ||
      instructions[i].mnemonic == 'REM'
    ) {
      for (let j = 0; j < 4; j++) {
        matrix[i].push('E');
        cycle++;
      }
    } else {
      matrix[i].push('E');
      cycle++;
    }
    matrix[i].push('M');
    cycle++;
    matrix[i].push('WB');
    cycle++;
  }

  console.log(matrix);
}
