import * as validator from '../resources/js/codeValidator.js';
import Instruction from '../resources/js/Instruction.js';

/* Test of instructions */
test('Simple ADD using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,1', 'ORI R2,R3,9', 'ADD R3,R2,R1'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
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
    const newInstruction = new Instruction(line, i);
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
    const newInstruction = new Instruction(line, i);
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
    const newInstruction = new Instruction(line, i);
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
test('Simple REM using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,37', 'ORI R2,R3,9', 'REM R3,R1,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    37,
    9,
    1,
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
test('Simple AND using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,37', 'ORI R2,R3,13', 'AND R3,R1,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    37,
    13,
    5,
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
test('Simple OR using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,37', 'ORI R2,R3,13', 'OR R3,R1,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    37,
    13,
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
test('Simple XOR using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,37', 'ORI R2,R3,13', 'XOR R3,R1,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    37,
    13,
    40,
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
test('Simple SLT using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,37', 'ORI R2,R3,13', 'SLT R3,R1,R2', 'SLT R4,R2,R1'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    37,
    13,
    0,
    1,
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
test('Simple SLL and SLR using ADDI and ORI', () => {
  const codeLines = ['ADDI R1,R2,37', 'ORI R2,R3,13', 'SLL R3,R1,R2', 'SLR R4,R3,R2'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    37,
    13,
    303104,
    37,
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

test('Inmediate Operations', () => {
  const codeLines = [
    'ADDI R0,R1,100',
    'ANDI R1,R0,64',
    'ORI R2,R1,32',
    'XORI R3,R1,64',
    'SLTI R5,R1,64',
    'SLTI R6,R0,101'
  ];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    100,
    64,
    96,
    0,
    0,
    0,
    1,
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

test('Move Operation', () => {
  const codeLines = ['ADDI R1,R1,40', 'MOVE R2,R1', 'MOVE R3,R2', 'MOVE R15,R3'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    40,
    40,
    40,
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
    40
  ]);
});
test('Branch Operations', () => {
  const codeLines = [
    'BEQ R1,R1,2',
    'ADDI R3,R3,51',
    'ADDI R4,R4,52',
    'ADDI R0,R0,5',
    'BNE R1,R1,2',
    'ADDI R5,R5,51',
    'ADDI R6,R6,52',
    'ADDI R7,R7,5'
  ];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    5,
    0,
    0,
    0,
    0,
    51,
    52,
    5,
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
test('Memory Operations', () => {
  const codeLines = ['ADDI R1,R1,2', 'SW R1,10(R0)', 'ADDI R1,R1,8', 'LW R2,0(R1)'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('registers', [
    0,
    10,
    2,
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
    0,
    0
  ]);
});
test('Jump Operations', () => {
  const codeLines = ['JUMP 5', 'NOP', 'NOP', 'NOP', 'NOP', 'NOP', 'NOP'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('instructionCount', 3);
});

/* Test of errors */
test('Overflow Error', () => {
  const codeLines = ['ADDI R1,R2,1000000', 'MUL R2,R1,R1'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('error');
});

test('Segmentation Fault', () => {
  const codeLines = ['ADDI R1,R2,1000000', 'LW R2,10(R1)'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('error');
});

test('Invalid JUMP', () => {
  const codeLines = ['JUMP 5'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('error');
});

test('Reach limit of operations', () => {
  const codeLines = ['JUMP 1', 'JUMP 0'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('error');
});
test('Division by 0', () => {
  const codeLines = ['DIV R1,R1,R1'];
  const instructions = [];
  for (let i = 0; i < codeLines.length; i += 1) {
    const line = codeLines[i];
    const newInstruction = new Instruction(line, i);
    instructions.push(newInstruction);
  }
  expect(validator.validateCode(instructions)).toHaveProperty('error');
});
