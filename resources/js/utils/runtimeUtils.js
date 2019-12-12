import * as parserUtils from './parserUtils.js';
import * as instructionSet from '../instructionSet.js';

export function executeInstruction(instruction, state) {
  let mnemonic = instruction.mnemonic;
  let registers = state.registers;
  let memory = state.memory;
  let pc = state.pc;
  let errorMessage = '';
  let jumped = false;
  if (parserUtils.threeRegisterInstruction(mnemonic)) {
    let operationVariables = {
      destinationRegister: instruction.destinationRegister,
      sourceRegister1: instruction.sourceRegister1,
      sourceRegister2: instruction.sourceRegister2,
      operator: getOperator(mnemonic)
    };
    if (mnemonic == 'DIV' && registers[operationVariables.sourceRegister2] == 0)
      errorMessage = 'Division by 0 on ' + instruction.fullInstruction;
    else {
      registers = operateOnRegisters(registers, operationVariables);
      if (overflow(registers[operationVariables.destinationRegister]))
        errorMessage = 'Overflow Error on Operation ' + instruction.fullInstruction;
    }
  } else if (parserUtils.twoRegistersOneConstantInstruction(mnemonic)) {
    let operationVariables = {
      destinationRegister: instruction.destinationRegister,
      sourceRegister1: instruction.sourceRegister1,
      constant: instruction.constant,
      operator: getOperator(mnemonic)
    };
    registers = operateOnRegistersAndConstant(registers, operationVariables);
    if (overflow(registers[operationVariables.destinationRegister]))
      errorMessage = 'Overflow Error on Operation ' + instruction.fullInstruction;
  } else if (parserUtils.memoryInstruction(mnemonic)) {
    let sReg1 = instruction.sourceRegister1;
    let offset = instruction.memoryOffset;
    let memoryAddress = registers[sReg1] + offset;
    if (isValidMemoryAddress(memoryAddress)) {
      if (mnemonic == 'LW') registers[instruction.destinationRegister] = memory[memoryAddress];
      else if (mnemonic == 'SW') memory[memoryAddress] = registers[instruction.sourceRegister2];
    } else errorMessage = 'Segmentation Fault, trying to access address ' + memoryAddress;
  } else if (mnemonic == 'MOVE') {
    registers[instruction.destinationRegister] = registers[instruction.sourceRegister1];
  } else if (parserUtils.branchInstruction(mnemonic)) {
    let source1 = instruction.sourceRegister1;
    let source2 = instruction.sourceRegister2;
    let relativeBranch = instruction.branchAddress + pc;

    if (isValidInstructionAddress(relativeBranch, state.numberOfInstructions)) {
      if (mnemonic == 'BEQ') {
        if (registers[source1] == registers[source2]) {
          pc = relativeBranch;
          jumped = true;
        }
      } else if (mnemonic == 'BNE') {
        if (registers[source1] != registers[source2]) {
          pc = relativeBranch;
          jumped = true;
        }
      }
    } else {
      errorMessage = 'Invalid branch address ' + relativeBranch;
    }
  } else if (mnemonic == 'JUMP') {
    let jumpAddress = instruction.jumpAddress;
    if (jumpAddress >= state.numberOfInstructions)
      errorMessage = 'Jumo Address Invalid ' + jumpAddress;
    else {
      pc = jumpAddress;
      jumped = true;
    }
  }

  let output = {
    registers,
    memory,
    pc,
    jumped
  };

  if (errorMessage != '') output.errorMessage = errorMessage;
  return output;
}
export function getOperator(mnemonic) {
  switch (mnemonic) {
    case 'ADD':
    case 'ADDI':
      return '+';
    case 'SUB':
      return '-';
    case 'MUL':
      return '*';
    case 'DIV':
      return '/';
    case 'REM':
      return '%';
    case 'AND':
    case 'ANDI':
      return '&';
    case 'OR':
    case 'ORI':
      return '|';
    case 'XOR':
    case 'XORI':
      return '^';
    case 'SLT':
    case 'SLTI':
      return '<';
    case 'SLL':
      return '<<';
    case 'SLR':
      return '>>';
    default:
      return -1;
  }
}
export function operateOnRegisters(registers, variables) {
  let dest = variables.destinationRegister;
  let source1 = variables.sourceRegister1;
  let source2 = variables.sourceRegister2;
  let operation = variables.operator;
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
  return registers;
}
export function operateOnRegistersAndConstant(registers, variables) {
  let dest = variables.destinationRegister;
  let source = variables.sourceRegister1;
  let constant = variables.constant;
  let operation = variables.operator;
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
  return registers;
}
export function overflow(value) {
  let maxValue = 2 ** 31 - 1;
  let minValue = -(2 ** 31);
  let overflow = false;
  if (value > maxValue) {
    overflow = true;
  }
  if (value < minValue) {
    overflow = true;
  }
  return overflow;
}

export function isValidMemoryAddress(memoryAddress) {
  return memoryAddress >= 0 && memoryAddress < instructionSet.memorySize;
}

export function isValidInstructionAddress(pc, numberOfInstructions) {
  return pc >= 0 && pc < numberOfInstructions;
}
