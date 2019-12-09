export function splitInLines(code) {
  return code.split('\n');
}

export function blankLine(line) {
  let removedSpaces = line.replace(/\s/g, '');
  return removedSpaces == '';
}

export function getMnemonic(instruction) {
  let splitted = instruction.split(' ');
  return splitted[0];
}

export function isValidMnemonic(mnemonic) {
  let validMnamonics = [
    'ADD',
    'ADDI',
    'SUB',
    'MUL',
    'DIV',
    'REM',
    'AND',
    'ANDI',
    'OR',
    'ORI',
    'XOR',
    'XORI',
    'SLT',
    'SLTI',
    'SLL',
    'SLR',
    'MOVE',
    'BEQ',
    'BNE',
    'LW',
    'SW',
    'JUMP',
    'NOP'
  ];

  return validMnamonics.indexOf(mnemonic) >= 0;
}

export function getParameters(instruction) {
  let splitted = instruction.split(' ');
  let parameters = splitted.slice(1, splitted.length).join('');
  return parameters;
}

export function threeRegisterInstruction(mnemonic) {
  let threeRegisterMnemonics = [
    'ADD',
    'SUB',
    'MUL',
    'DIV',
    'REM',
    'AND',
    'OR',
    'XOR',
    'SLT',
    'SLL',
    'SLR'
  ];
  return threeRegisterMnemonics.indexOf(mnemonic) >= 0;
}

export function twoRegistersOneConstantInstruction(mnemonic) {
  let twoRegisterOneConstantMnemonics = ['ADDI', 'ANDI', 'ORI', 'XORI', 'SLTI'];
  return twoRegisterOneConstantMnemonics.indexOf(mnemonic) >= 0;
}

export function twoRegisterInstruction(mnemonic) {
  let twoRegisterMnemonics = ['MOVE'];
  return twoRegisterMnemonics.indexOf(mnemonic) >= 0;
}

export function branchInstruction(mnemonic) {
  let branchMnemonics = ['BEQ', 'BNE'];
  return branchMnemonics.indexOf(mnemonic) >= 0;
}

export function memoryInstruction(mnemonic) {
  let memoryMnemonics = ['LW', 'SW'];
  return memoryMnemonics.indexOf(mnemonic) >= 0;
}
export function jumpInstruction(mnemonic) {
  let jumpMnemonics = ['JUMP'];
  return jumpMnemonics.indexOf(mnemonic) >= 0;
}
export function nopInstruction(mnemonic) {
  let nopMnemonics = ['NOP'];
  return nopMnemonics.indexOf(mnemonic) >= 0;
}

export function isValidRegister(register) {
  return register[0] == 'R' && isValidRegisterNumber(getRegisterNumber(register));
}

export function isValidRegisterNumber(registerNumber) {
  return registerNumber >= 0 && registerNumber <= 15;
}

export function getRegisterNumber(register) {
  let registerNumber = register
    .split('')
    .slice(1, register.length)
    .join('');
  if (registerNumber == '') return -1;
  return Number(registerNumber);
}

export function isValidConstant(number) {
  if (number == '') return false;
  let castNumber = Number(number);
  if (Number.isInteger(castNumber) && castNumber >= -(2 ** 31) && castNumber <= 2 ** 31 - 1)
    return true;
  else return false;
}

export function isValidMemoryAccess(memoryAccess) {
  let offset = getOffset(memoryAccess);
  let register = getRegisterFromMemory(memoryAccess);
  if (offset === undefined || register === undefined) return false;
  else return true;
}

export function getOffset(memoryAccess) {
  let i = 0;
  let offset = '';
  while (i < memoryAccess.length && memoryAccess[i] != '(') {
    offset += memoryAccess[i];
    i++;
  }

  if (memoryAccess[i] != '(') return undefined;
  if (isValidConstant(offset)) return getConstant(offset);
  else return undefined;
}

export function getRegisterFromMemory(memoryAccess) {
  let i = 0;
  let register = '';
  while (i < memoryAccess.length && memoryAccess[i] != '(') {
    i++;
  }
  if (memoryAccess[i] != '(') return undefined;
  else i++;
  while (i < memoryAccess.length && memoryAccess[i] != ')') {
    register += memoryAccess[i];
    i++;
  }
  if (memoryAccess[i] != ')') return undefined;

  if (isValidRegister(register)) return getRegisterNumber(register);
  else return undefined;
}

export function getConstant(number) {
  return Number(number);
}

export function isValidJumpAddress(number) {
  if (number == '') return false;
  let castNumber = Number(number);
  if (Number.isInteger(castNumber) && castNumber >= 0 && castNumber <= 2 ** 31 - 1) return true;
  else return false;
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

export function createMatrix(n, m) {
  let matrix = new Array(n);

  for (let i = 0; i < n; i++) {
    matrix[i] = [];
  }
  return matrix;
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
  return memoryAddress >= 0 && memoryAddress <= 127;
}

export function isValidInstructionAddress(pc, numberOfInstructions) {
  return pc >= 0 && pc < numberOfInstructions;
}
