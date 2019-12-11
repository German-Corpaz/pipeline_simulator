export function isValidRegister(register) {
  return (
    register[0] == 'R' &&
    isValidRegisterNumber(getRegisterNumber(register)) &&
    register.indexOf(' ') < 0
  );
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
