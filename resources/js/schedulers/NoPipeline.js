export class NoPipeline {
  constructor(codeExecutionResult) {
    let data = noPipelineMatrix(codeExecutionResult);
    this.instructions = data.instructions;
    this.matrix = data.matrix;
  }
}

function noPipelineMatrix(result) {
  const MULT_DIV_CYCLES = 4;

  let instructions = result.executedInstructions;

  let matrix = [];
  let cycle = 0;

  for (let i = 0; i < instructions.length; i++) {
    let mnemonic = instructions[i].mnemonic;
    matrix.push([]);
    for (let k = 0; k < cycle; k++) {
      matrix[i].push(null);
    }
    matrix[i].push('F');
    cycle++;
    matrix[i].push('D');
    cycle++;
    if (mnemonic == 'MUL' || mnemonic == 'DIV' || mnemonic == 'REM') {
      for (let j = 0; j < MULT_DIV_CYCLES; j++) {
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
  let output = {
    matrix,
    instructions
  };
  return output;
}
