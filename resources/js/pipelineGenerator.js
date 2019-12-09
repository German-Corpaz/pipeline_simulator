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

export function getMatrixNotForwardingPipelining(result) {
  let matrix = [];
  let instructions = result.instructions;
  const registers = new Array(16).fill(0);
  const memory = new Array(128).fill(0);
  let fetchStage = null;
  let decodeStage = null;
  let memoryStage = null;
  let writebackStage = null;
  let executeStage = null;
  let pc = 0;
  let cycle = 0;
  let instructionsExecuted = [];
  let usedRegisters = [];
  let cyclesInExecute = 0;
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
  const releaseRegister = instruction => {
    if (instruction.destinationRegister != undefined)
      usedRegisters.splice(usedRegisters.indexOf(instruction.destinationRegister), 1);
  };
  const operateOnRegisters = (dest, source1, source2, operation) => {
    switch (operation) {
      case '+':
        registers[dest] = registers[source1] + registers[source2];
        break;
      case '-':
        registers[dest] = registers[source1] - registers[source2];
        break;
      case '*':
        registers[dest] = registers[source1] * registers[source2];
        break;
      case '/':
        registers[dest] = Math.floor(registers[source1] / registers[source2]);
        break;
      case '%':
        registers[dest] = registers[source1] % registers[source2];
        break;
      case '&':
        registers[dest] = registers[source1] & registers[source2];
        break;
      case '|':
        registers[dest] = registers[source1] | registers[source2];
        break;
      case '^':
        registers[dest] = registers[source1] ^ registers[source2];
        break;
      case '<':
        registers[dest] = registers[source1] < registers[source2] ? 1 : 0;
        break;
      case '<<':
        registers[dest] = registers[source1] << registers[source2];
        break;
      case '>>':
        registers[dest] = registers[source1] >> registers[source2];
        break;
      default:
    }
  };
  const operateOnRegistersAndConstant = (dest, source, constant, operation) => {
    switch (operation) {
      case '+':
        registers[dest] = registers[source] + constant;
        break;
      case '&':
        registers[dest] = registers[source] & constant;
        break;
      case '|':
        registers[dest] = registers[source] | constant;
        break;
      case '^':
        registers[dest] = registers[source] ^ constant;
        break;
      case '<':
        registers[dest] = registers[source] < constant ? 1 : 0;
        break;
    }
  };
  const checkOverflow = dest => {
    let maxValue = 2 ** 31 - 1;
    let minValue = -(2 ** 31);
    let overflow = false;
    if (registers[dest] > maxValue) {
      registers[dest] = maxValue;
      overflow = true;
    }
    if (registers[dest] < minValue) {
      overflow = true;
      registers[dest] = minValue;
    }
    return overflow;
  };
  const executeInstruction = instruction => {
    let mnemonic = instruction.mnemonic;
    if (utilities.threeRegisterInstruction(mnemonic)) {
      let dReg = instruction.destinationRegister;
      let s1Reg = instruction.sourceRegister1;
      let s2Reg = instruction.sourceRegister2;
      let operator = utilities.getOperator(mnemonic);
      operateOnRegisters(dReg, s1Reg, s2Reg, operator);
      checkOverflow(dReg);
    } else if (utilities.twoRegistersOneConstantInstruction(mnemonic)) {
      let dReg = instruction.destinationRegister;
      let s1Reg = instruction.sourceRegister1;
      let constant = instruction.constant;
      let operator = utilities.getOperator(mnemonic);
      operateOnRegistersAndConstant(dReg, s1Reg, constant, operator);
      checkOverflow(dReg);
    } else if (mnemonic == 'MOVE') {
      registers[instruction.destinationRegister] = registers[instruction.sourceRegister1];
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
  const accessMemory = instruction => {
    let mnemonic = instruction.mnemonic;
    if (utilities.memoryInstruction(mnemonic)) {
      let sReg1 = instruction.sourceRegister1;
      let offset = instruction.memoryOffset;
      let memoryAddress = registers[sReg1] + offset;
      if (mnemonic == 'LW') registers[instruction.destinationRegister] = memory[memoryAddress];
      else if (mnemonic == 'SW') memory[memoryAddress] = registers[instruction.sourceRegister2];
    }
  };
  while (pc < instructions.length || instructionsInPipe()) {
    if (writebackStage) {
      releaseRegister(writebackStage.instruction);
      writebackStage = null;
    }
    if (memoryStage) {
      accessMemory(memoryStage.instruction);
      writebackStage = memoryStage;
      matrix[writebackStage.index].push('WB');
      memoryStage = null;
    }
    if (executeStage) {
      if (isMultipleCycleInstruction(executeStage.instruction)) {
        if (cyclesInExecute == 3) {
          executeInstruction(executeStage.instruction);
          cyclesInExecute = 0;
          memoryStage = executeStage;
          matrix[memoryStage.index].push('M');
          executeStage = null;
        } else {
          cyclesInExecute++;
          matrix[executeStage.index].push('E');
        }
      } else {
        executeInstruction(executeStage.instruction);
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

  return matrix;
}
