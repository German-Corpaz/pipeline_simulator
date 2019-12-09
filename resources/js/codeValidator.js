import * as utilities from './utilities.js';

export function validateCode(instructions) {
  const MEMORY_SIZE = 128;
  const MAX_INSTRUCTIONS = 200;
  let registers = new Array(16).fill(0);
  const memory = new Array(MEMORY_SIZE).fill(0);

  let pc = 0;
  let actualInstruction;
  let errorMessage = '';
  let executedInstructions = [];

  while (pc >= 0 && pc < instructions.length) {
    actualInstruction = instructions[pc];
    executedInstructions.push(actualInstruction);
    pc++;
    let mnemonic = actualInstruction.mnemonic;

    if (utilities.threeRegisterInstruction(mnemonic)) {
      let operationVariables = {
        destinationRegister: actualInstruction.destinationRegister,
        sourceRegister1: actualInstruction.sourceRegister1,
        sourceRegister2: actualInstruction.sourceRegister2,
        operator: utilities.getOperator(mnemonic)
      };
      if (mnemonic == 'DIV' && registers[operationVariables.sourceRegister2] == 0)
        errorMessage = 'Division by 0 on ' + actualInstruction.fullInstruction;
      else {
        registers = utilities.operateOnRegisters(registers, operationVariables);
        if (utilities.overflow(registers[operationVariables.destinationRegister]))
          errorMessage = 'Overflow Error on Operation ' + actualInstruction.fullInstruction;
      }
    } else if (utilities.twoRegistersOneConstantInstruction(mnemonic)) {
      let operationVariables = {
        destinationRegister: actualInstruction.destinationRegister,
        sourceRegister1: actualInstruction.sourceRegister1,
        constant: actualInstruction.constant,
        operator: utilities.getOperator(mnemonic)
      };
      registers = utilities.operateOnRegistersAndConstant(registers, operationVariables);
      if (utilities.overflow(registers[operationVariables.destinationRegister]))
        errorMessage = 'Overflow Error on Operation ' + actualInstruction.fullInstruction;
    } else if (utilities.memoryInstruction(mnemonic)) {
      let sReg1 = actualInstruction.sourceRegister1;
      let offset = actualInstruction.memoryOffset;
      let memoryAddress = registers[sReg1] + offset;
      if (utilities.isValidMemoryAddress(memoryAddress)) {
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

      if (utilities.isValidInstructionAddress(relativeBranch, instructions.length)) {
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

    if (executedInstructions.length > MAX_INSTRUCTIONS)
      errorMessage = 'Instruction limit reached (' + MAX_INSTRUCTIONS + ')';
    if (errorMessage != '') break;
  }

  const result = {
    registers,
    memory,
    executedInstructions,
    instructionCount: executedInstructions.length
  };
  if (errorMessage != '') result.errorMessage = errorMessage;
  return result;
}
