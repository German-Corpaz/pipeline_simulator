import { architecture } from '../architecture.js';
export function getMnemonic(instruction) {
  let splitted = instruction.split(' ');
  return splitted[0];
}

export function isValidMnemonic(mnemonic) {
  let validMnemonics = architecture.instructions;
  return validMnemonics.indexOf(mnemonic) >= 0;
}

export function getParameters(instruction) {
  let splitted = instruction.split(' ');
  let parametersString = splitted.slice(1, splitted.length).join(' ');
  let parametersArray = parametersString.trim().split(',');
  let output = '';
  for (let i = 0; i < parametersArray.length; i++) {
    output += parametersArray[i].trim() + ',';
  }
  let outputWithoutLastChar = output.slice(0, -1);
  return outputWithoutLastChar;
}

export function threeRegisterInstruction(mnemonic) {
  let threeRegisterMnemonics = architecture.threeRegisterMnemonics;
  return threeRegisterMnemonics.indexOf(mnemonic) >= 0;
}

export function twoRegistersOneConstantInstruction(mnemonic) {
  let twoRegisterOneConstantMnemonics = architecture.twoRegisterOneConstantMnemonics;
  return twoRegisterOneConstantMnemonics.indexOf(mnemonic) >= 0;
}

export function twoRegisterInstruction(mnemonic) {
  let twoRegisterMnemonics = architecture.twoRegisterMnemonics;
  return twoRegisterMnemonics.indexOf(mnemonic) >= 0;
}

export function branchInstruction(mnemonic) {
  let branchMnemonics = architecture.branchMnemonics;
  return branchMnemonics.indexOf(mnemonic) >= 0;
}

export function memoryInstruction(mnemonic) {
  let memoryMnemonics = architecture.memoryMnemonics;
  return memoryMnemonics.indexOf(mnemonic) >= 0;
}
export function jumpInstruction(mnemonic) {
  let jumpMnemonics = architecture.jumpMnemonics;
  return jumpMnemonics.indexOf(mnemonic) >= 0;
}
export function nopInstruction(mnemonic) {
  let nopMnemonics = architecture.nopMnemonics;
  return nopMnemonics.indexOf(mnemonic) >= 0;
}

export function isValidRegister(register) {
  return (
    register[0] == 'R' &&
    isValidRegisterNumber(getRegisterNumber(register)) &&
    register.indexOf(' ') < 0
  );
}

export function isValidRegisterNumber(registerNumber) {
  return registerNumber >= 0 && registerNumber < architecture.registers;
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

export function getConstant(number) {
  return Number(number);
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
  offset = offset.trim();
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

  register = register.trim();
  if (isValidRegister(register)) return getRegisterNumber(register);
  else return undefined;
}

export function isValidJumpAddress(number) {
  if (number == '') return false;
  let castNumber = Number(number);
  if (Number.isInteger(castNumber) && castNumber >= 0 && castNumber <= 2 ** 31 - 1) return true;
  else return false;
}
