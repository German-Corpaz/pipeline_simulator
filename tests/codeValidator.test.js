/* eslint-disable import/extensions */
import * as validator from '../resources/js/codeValidator.js';
import Instruction from '../resources/js/Instruction.js';

test('Overflow warning', () => {
  const codeLines = ['ADDI R1,R2,1000000', 'MUL R2,R1,R1'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('warningMessage');
});

test('Simple ADD using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,1', 'ORI R2,R3,9', 'ADD R3,R2,R1'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    1,
    9,
    10,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
});
test('Simple SUB using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,1', 'ORI R2,R3,9', 'SUB R3,R1,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    1,
    9,
    -8,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
});
test('Simple MUL using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,5', 'ORI R2,R3,9', 'MUL R3,R1,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    5,
    9,
    45,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
});
test('Simple DIV using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,37', 'ORI R2,R3,9', 'DIV R3,R1,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    37,
    9,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]);
});
