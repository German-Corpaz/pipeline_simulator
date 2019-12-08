import * as utilities from './utilities.js';

export function validateCode(instructions) {
  const registers = new Array(16).fill(0);
  const memory = new Array(128).fill(0);

  let pc = 0;
  let actualInstruction;
  let warningMessage = '';
  let errorMessage = '';
  let executedInstructions = [];
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

  const isValidMemoryAddress = memoryAddress => {
    return memoryAddress >= 0 && memoryAddress <= 127;
  };
  const isValidInstructionAddress = pc => {
    return pc >= 0 && pc < instructions.length;
  };

  while (pc >= 0 && pc < instructions.length) {
    actualInstruction = instructions[pc];
    executedInstructions.push(actualInstruction);
    pc++;
    let mnemonic = actualInstruction.mnemonic;

    if (utilities.threeRegisterInstruction(mnemonic)) {
      let dReg = actualInstruction.destinationRegister;
      let s1Reg = actualInstruction.sourceRegister1;
      let s2Reg = actualInstruction.sourceRegister2;
      let operator = utilities.getOperator(mnemonic);
      operateOnRegisters(dReg, s1Reg, s2Reg, operator);
      if (checkOverflow(dReg))
        warningMessage += 'Overflow Error on Operation ' + actualInstruction.fullInstruction + '\n';
    } else if (utilities.twoRegistersOneConstantInstruction(mnemonic)) {
      let dReg = actualInstruction.destinationRegister;
      let s1Reg = actualInstruction.sourceRegister1;
      let constant = actualInstruction.constant;
      let operator = utilities.getOperator(mnemonic);
      operateOnRegistersAndConstant(dReg, s1Reg, constant, operator);
      if (checkOverflow(dReg))
        warningMessage += 'Overflow Error on Operation ' + actualInstruction.fullInstruction + '\n';
    } else if (utilities.memoryInstruction(mnemonic)) {
      let sReg1 = actualInstruction.sourceRegister1;
      let offset = actualInstruction.memoryOffset;
      let memoryAddress = registers[sReg1] + offset;
      if (isValidMemoryAddress(memoryAddress)) {
        if (mnemonic == 'LW')
          registers[actualInstruction.destinationRegister] = memory[memoryAddress];
        else if (mnemonic == 'SW')
          memory[memoryAddress] = registers[actualInstruction.sourceRegister2];
      } else errorMessage = 'Segmentation Fault, trying to access address ' + memoryAddress;
    } else if (mnemonic == 'MOVE') {
      registers[actualInstruction.destinationRegister] =
        registers[actualInstruction.sourceRegister1];
    } else if (utilities.branchInstruction(mnemonic)) {
      let source1 = actualInstruction.sourceRegister1;
      let source2 = actualInstruction.sourceRegister2;
      let relativeBranch = actualInstruction.branchAddress + pc;

      if (isValidInstructionAddress(relativeBranch)) {
        if (mnemonic == 'BEQ') {
          if (registers[source1] == registers[source2]) pc = relativeBranch;
        } else if (mnemonic == 'BNE') {
          if (registers[source1] != registers[source2]) pc = relativeBranch;
        }
      } else {
        errorMessage = 'Invalid branch address ' + relativeBranch;
      }
    } else if (mnemonic == 'JUMP') {
      let jumpAddress = actualInstruction.jumpAddress;
      if (jumpAddress >= instructions.length) errorMessage = 'Jumo Address Invalid ' + jumpAddress;
      else pc = jumpAddress;
    }

    if (executedInstructions.length > 100) errorMessage = 'Instruction limit reached (100)';
    if (errorMessage != '') break;
  }

  const result = {
    registers,
    memory,
    executedInstructions,
    instructionCount: executedInstructions.length
  };
  if (errorMessage != '') result.errorMessage = errorMessage;
  if (warningMessage != '') result.warningMessage = warningMessage;
  return result;
}
