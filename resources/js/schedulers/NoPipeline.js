export class NoPipeline {
  constructor(codeExecutionResult) {
    let data = noPipelineMatrix(codeExecutionResult);
    this.instructions = data.instructions;
    this.matrix = data.matrix;
  }
}

function noPipelineMatrix(result) {
  const MULT_CYCLES = 1;
  const DIV_CYCLES = 1;
  const READMEMORY_CYCLES = 1;
  const WRITEMEMORY_CYCLES = 1;
  const CONDITIONAL_BRANCH_CYCLES = 1;
  const UNCONDITIONAL_BRANCH_CYCLES = 1;
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
    if (mnemonic == 'MUL') {
      for (let j = 0; j < MULT_CYCLES; j++) {
        matrix[i].push('E');
        cycle++;
      }
    } else if (mnemonic == 'DIV' || mnemonic == 'REM') {
      for (let j = 0; j < DIV_CYCLES; j++) {
        matrix[i].push('E');
        cycle++;
      }
    } else if (mnemonic == 'BEQ' || mnemonic == 'BNE') {
      for (let j = 0; j < CONDITIONAL_BRANCH_CYCLES; j++) {
        matrix[i].push('E');
        cycle++;
      }
    } else if (mnemonic == 'JUMP') {
      for (let j = 0; j < UNCONDITIONAL_BRANCH_CYCLES; j++) {
        matrix[i].push('E');
        cycle++;
      }
    } else {
      matrix[i].push('E');
      cycle++;
    }
    if (mnemonic == 'LW') {
      for (let j = 0; j < READMEMORY_CYCLES; j++) {
        matrix[i].push('M');
        cycle++;
      }
    } else if (mnemonic == 'SW') {
      for (let j = 0; j < WRITEMEMORY_CYCLES; j++) {
        matrix[i].push('M');
        cycle++;
      }
    } else {
      matrix[i].push('M');
      cycle++;
    }

    matrix[i].push('WB');
    cycle++;
  }
  let output = {
    matrix,
    instructions
  };
  return output;
}
