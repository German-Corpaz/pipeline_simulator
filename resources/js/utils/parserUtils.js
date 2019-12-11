import * as instructionSet from '../instructionSet.js';
export function getMnemonic(instruction) {
  let splitted = instruction.split(' ');
  return splitted[0];
}

export function isValidMnemonic(mnemonic) {
  let validMnamonics = instructionSet.instructions;
  return validMnamonics.indexOf(mnemonic) >= 0;
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
  let threeRegisterMnemonics = instructionSet.threeRegisterMnemonics;
  return threeRegisterMnemonics.indexOf(mnemonic) >= 0;
}

export function twoRegistersOneConstantInstruction(mnemonic) {
  let twoRegisterOneConstantMnemonics = instructionSet.twoRegisterOneConstantMnemonics;
  return twoRegisterOneConstantMnemonics.indexOf(mnemonic) >= 0;
}

export function twoRegisterInstruction(mnemonic) {
  let twoRegisterMnemonics = instructionSet.twoRegisterMnemonics;
  return twoRegisterMnemonics.indexOf(mnemonic) >= 0;
}

export function branchInstruction(mnemonic) {
  let branchMnemonics = instructionSet.branchMnemonics;
  return branchMnemonics.indexOf(mnemonic) >= 0;
}

export function memoryInstruction(mnemonic) {
  let memoryMnemonics = instructionSet.memoryMnemonics;
  return memoryMnemonics.indexOf(mnemonic) >= 0;
}
export function jumpInstruction(mnemonic) {
  let jumpMnemonics = instructionSet.jumpMnemonics;
  return jumpMnemonics.indexOf(mnemonic) >= 0;
}
export function nopInstruction(mnemonic) {
  let nopMnemonics = instructionSet.nopMnemonics;
  return nopMnemonics.indexOf(mnemonic) >= 0;
}
