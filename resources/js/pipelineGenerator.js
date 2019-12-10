import * as utilities from './utilities.js';
export function getMatrixWithoutPipelining(result) {
  const DIV_AND_MULT_CYCLES = 4;
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
      for (let j = 0; j < DIV_AND_MULT_CYCLES; j++) {
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
  return matrix;
}

export function getMatrixNotForwardingPipelining(result) {
  const MEMORY_SIZE = 128;
  const DIV_AND_MULT_CYCLES = 4;
  let matrix = [];
  let instructions = result.instructions;
  let registers = new Array(16).fill(0);
  const memory = new Array(MEMORY_SIZE).fill(0);
  let fetchStage = null;
  let decodeStage = null;
  let memoryStage = null;
  let writebackStage = null;
  let executeStage = null;
  let pc = 0;
  let cycle = 0;
  let instructionsExecuted = [];
  let usedRegisters = [];
  let cyclesInExecute = 1;
  const instructionsInPipe = () => {
    let instructionInPipe = false;
    instructionInPipe =
      fetchStage || decodeStage || executeStage || memoryStage || writebackStage ? true : false;
    return instructionInPipe;
  };

  const isMultipleCycleInstruction = instruction => {
    let condition =
      instruction.mnemonic == 'MUL' ||
      instruction.mnemonic == 'DIV' ||
      instruction.mnemonic == 'REM';
    return condition;
  };

  const hazard = instruction => {
    let source1 = instruction.sourceRegister1;
    let source2 = instruction.sourceRegister2;
    let hazard = false;
    if (usedRegisters.indexOf(source1) >= 0 || usedRegisters.indexOf(source2) >= 0) hazard = true;
    return hazard;
  };

  const addRegister = instruction => {
    if (instruction.destinationRegister != undefined)
      usedRegisters.push(instruction.destinationRegister);
  };
  const releaseRegisterFromInstruction = instruction => {
    if (instruction.destinationRegister != undefined)
      usedRegisters.splice(usedRegisters.indexOf(instruction.destinationRegister), 1);
  };

  const executeInstruction = instruction => {
    let mnemonic = instruction.mnemonic;
    if (utilities.threeRegisterInstruction(mnemonic)) {
      let variables = {
        destinationRegister: instruction.destinationRegister,
        sourceRegister1: instruction.sourceRegister1,
        sourceRegister2: instruction.sourceRegister2,
        operator: utilities.getOperator(mnemonic)
      };
      registers = utilities.operateOnRegisters(registers, variables);
    } else if (utilities.twoRegistersOneConstantInstruction(mnemonic)) {
      let variables = {
        destinationRegister: instruction.destinationRegister,
        sourceRegister1: instruction.sourceRegister1,
        constant: instruction.constant,
        operator: utilities.getOperator(mnemonic)
      };
      registers = utilities.operateOnRegistersAndConstant(registers, variables);
    } else if (mnemonic == 'MOVE') {
      registers[instruction.destinationRegister] = registers[instruction.sourceRegister1];
    } else if (utilities.memoryInstruction(mnemonic)) {
      let sReg1 = instruction.sourceRegister1;
      let offset = instruction.memoryOffset;
      let memoryAddress = registers[sReg1] + offset;
      if (mnemonic == 'LW') registers[instruction.destinationRegister] = memory[memoryAddress];
      else if (mnemonic == 'SW') memory[memoryAddress] = registers[instruction.sourceRegister2];
    } else if (utilities.branchInstruction(mnemonic)) {
      let source1 = instruction.sourceRegister1;
      let source2 = instruction.sourceRegister2;
      let relativeBranch = instruction.branchAddress + instruction.index + 1;
      if (mnemonic == 'BEQ') {
        if (registers[source1] == registers[source2]) {
          pc = relativeBranch;
          fetchStage = null;
          decodeStage = null;
        }
      } else if (mnemonic == 'BNE') {
        if (registers[source1] != registers[source2]) {
          pc = relativeBranch;
          fetchStage = null;
          decodeStage = null;
        }
      }
    } else if (mnemonic == 'JUMP') {
      let jumpAddress = instruction.jumpAddress;
      pc = jumpAddress;
      fetchStage = null;
      decodeStage = null;
    }
  };

  while (pc < instructions.length || instructionsInPipe()) {
    if (writebackStage) {
      let mnemonic = writebackStage.instruction.mnemonic;
      if (!utilities.branchInstruction(mnemonic)) executeInstruction(writebackStage.instruction);
      releaseRegisterFromInstruction(writebackStage.instruction);
      writebackStage = null;
    }
    if (memoryStage) {
      writebackStage = memoryStage;
      matrix[writebackStage.index].push('WB');
      memoryStage = null;
    }
    if (executeStage) {
      if (isMultipleCycleInstruction(executeStage.instruction)) {
        if (cyclesInExecute == DIV_AND_MULT_CYCLES) {
          cyclesInExecute = 1;
          memoryStage = executeStage;
          matrix[memoryStage.index].push('M');
          executeStage = null;
        } else {
          cyclesInExecute++;
          matrix[executeStage.index].push('E');
        }
      } else {
        let mnemonic = executeStage.instruction.mnemonic;
        if (utilities.branchInstruction(mnemonic)) executeInstruction(executeStage.instruction);
        memoryStage = executeStage;
        matrix[memoryStage.index].push('M');
        executeStage = null;
      }
    }
    if (decodeStage) {
      if (executeStage == null && !hazard(decodeStage.instruction)) {
        executeStage = decodeStage;
        addRegister(executeStage.instruction);
        matrix[executeStage.index].push('E');
        decodeStage = null;
      } else {
        matrix[decodeStage.index].push('S');
      }
    }
    if (fetchStage) {
      if (decodeStage == null) {
        decodeStage = fetchStage;
        matrix[decodeStage.index].push('D');
        fetchStage = null;
      } else {
        matrix[fetchStage.index].push('S');
      }
    }
    if (fetchStage == null) {
      if (pc < instructions.length) {
        let index = instructionsExecuted.length;
        fetchStage = {
          instruction: instructions[pc],
          index: index
        };
        matrix.push([]);
        for (let i = 0; i < cycle; i++) matrix[index].push(null);
        matrix[index].push('F');
        instructionsExecuted.push(instructions[pc]);
        pc++;
      }
    }

    cycle++;
    if (cycle > 500) break;
  }
  console.log(matrix);
  console.log(instructionsExecuted);
  console.log(registers);
  console.log(memory);
  return matrix;
}
