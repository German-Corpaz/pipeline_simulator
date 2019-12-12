import { parseInstruction } from '../resources/js/Instruction.js';

/* Test of all valids instructions */
test('Parse instruction ADD R1,R2,R3', () => {
  expect(parseInstruction('ADD R1,R2,R3')).toStrictEqual({
    fullInstruction: 'ADD R1,R2,R3',
    mnemonic: 'ADD',
    destinationRegister: 1,
    sourceRegister1: 2,
    sourceRegister2: 3,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction SUB R1,R14,R12', () => {
  expect(parseInstruction('SUB R1,R14,R12')).toStrictEqual({
    fullInstruction: 'SUB R1,R14,R12',
    mnemonic: 'SUB',
    destinationRegister: 1,
    sourceRegister1: 14,
    sourceRegister2: 12,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction MUL R1,R3,R6', () => {
  expect(parseInstruction('MUL R1,R3,R6')).toStrictEqual({
    fullInstruction: 'MUL R1,R3,R6',
    mnemonic: 'MUL',
    destinationRegister: 1,
    sourceRegister1: 3,
    sourceRegister2: 6,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction DIV R2,R3,R4', () => {
  expect(parseInstruction('DIV R2,R3,R4')).toStrictEqual({
    fullInstruction: 'DIV R2,R3,R4',
    mnemonic: 'DIV',
    destinationRegister: 2,
    sourceRegister1: 3,
    sourceRegister2: 4,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction REM R2,R3,R4', () => {
  expect(parseInstruction('REM R2,R3,R4')).toStrictEqual({
    fullInstruction: 'REM R2,R3,R4',
    mnemonic: 'REM',
    destinationRegister: 2,
    sourceRegister1: 3,
    sourceRegister2: 4,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction AND R2,R3,R4', () => {
  expect(parseInstruction('AND R2,R3,R4')).toStrictEqual({
    fullInstruction: 'AND R2,R3,R4',
    mnemonic: 'AND',
    destinationRegister: 2,
    sourceRegister1: 3,
    sourceRegister2: 4,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction OR R12,R13,R14', () => {
  expect(parseInstruction('OR R12,R13,R14')).toStrictEqual({
    fullInstruction: 'OR R12,R13,R14',
    mnemonic: 'OR',
    destinationRegister: 12,
    sourceRegister1: 13,
    sourceRegister2: 14,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction XOR R12,R0,R15', () => {
  expect(parseInstruction('XOR R12,R0,R15')).toStrictEqual({
    fullInstruction: 'XOR R12,R0,R15',
    mnemonic: 'XOR',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: 15,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction SLT R12,R0,R15', () => {
  expect(parseInstruction('SLT R12,R0,R15')).toStrictEqual({
    fullInstruction: 'SLT R12,R0,R15',
    mnemonic: 'SLT',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: 15,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction SLL R12,R0,R15', () => {
  expect(parseInstruction('SLL R12,R0,R15')).toStrictEqual({
    fullInstruction: 'SLL R12,R0,R15',
    mnemonic: 'SLL',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: 15,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction SLR R12,R0,R15', () => {
  expect(parseInstruction('SLR R12,R0,R15')).toStrictEqual({
    fullInstruction: 'SLR R12,R0,R15',
    mnemonic: 'SLR',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: 15,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction ADDI R12,R0,950', () => {
  expect(parseInstruction('ADDI R12,R0,950')).toStrictEqual({
    fullInstruction: 'ADDI R12,R0,950',
    mnemonic: 'ADDI',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: undefined,
    constant: 950,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction ANDI R12,R0,950', () => {
  expect(parseInstruction('ANDI R12,R0,950')).toStrictEqual({
    fullInstruction: 'ANDI R12,R0,950',
    mnemonic: 'ANDI',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: undefined,
    constant: 950,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction ORI R12,R0,950', () => {
  expect(parseInstruction('ORI R12,R0,950')).toStrictEqual({
    fullInstruction: 'ORI R12,R0,950',
    mnemonic: 'ORI',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: undefined,
    constant: 950,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction XORI R12,R0,950', () => {
  expect(parseInstruction('XORI R12,R0,950')).toStrictEqual({
    fullInstruction: 'XORI R12,R0,950',
    mnemonic: 'XORI',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: undefined,
    constant: 950,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction SLTI R12,R0,950', () => {
  expect(parseInstruction('SLTI R12,R0,950')).toStrictEqual({
    fullInstruction: 'SLTI R12,R0,950',
    mnemonic: 'SLTI',
    destinationRegister: 12,
    sourceRegister1: 0,
    sourceRegister2: undefined,
    constant: 950,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction MOVE R1,R2', () => {
  expect(parseInstruction('MOVE R1,R2')).toStrictEqual({
    fullInstruction: 'MOVE R1,R2',
    mnemonic: 'MOVE',
    destinationRegister: 1,
    sourceRegister1: 2,
    sourceRegister2: undefined,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction BEQ R1,R2,100', () => {
  expect(parseInstruction('BEQ R1,R2,100')).toStrictEqual({
    fullInstruction: 'BEQ R1,R2,100',
    mnemonic: 'BEQ',
    destinationRegister: undefined,
    sourceRegister1: 2,
    sourceRegister2: 1,
    constant: undefined,
    branchAddress: 100,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction BNE R1,R2,100', () => {
  expect(parseInstruction('BNE R1,R2,100')).toStrictEqual({
    fullInstruction: 'BNE R1,R2,100',
    mnemonic: 'BNE',
    destinationRegister: undefined,
    sourceRegister1: 2,
    sourceRegister2: 1,
    constant: undefined,
    branchAddress: 100,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});
test('Parse instruction LW R1,40(R2)', () => {
  expect(parseInstruction('LW R1,40(R2)')).toStrictEqual({
    fullInstruction: 'LW R1,40(R2)',
    mnemonic: 'LW',
    destinationRegister: 1,
    sourceRegister1: 2,
    sourceRegister2: undefined,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: 40,
    jumpAddress: undefined
  });
});
test('Parse instruction SW R1,40(R2)', () => {
  expect(parseInstruction('SW R1,40(R2)')).toStrictEqual({
    fullInstruction: 'SW R1,40(R2)',
    mnemonic: 'SW',
    destinationRegister: undefined,
    sourceRegister1: 2,
    sourceRegister2: 1,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: 40,
    jumpAddress: undefined
  });
});
test('Parse instruction JUMP 123', () => {
  expect(parseInstruction('JUMP 123')).toStrictEqual({
    fullInstruction: 'JUMP 123',
    mnemonic: 'JUMP',
    destinationRegister: undefined,
    sourceRegister1: undefined,
    sourceRegister2: undefined,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: 123
  });
});
test('Parse instruction NOP', () => {
  expect(parseInstruction('NOP')).toStrictEqual({
    fullInstruction: 'NOP ',
    mnemonic: 'NOP',
    destinationRegister: undefined,
    sourceRegister1: undefined,
    sourceRegister2: undefined,
    constant: undefined,
    branchAddress: undefined,
    memoryOffset: undefined,
    jumpAddress: undefined
  });
});

/* Test error on parsing */
test('Parse instruction AD R1    ,R2    ,R3', () => {
  expect(parseInstruction('AD R1    ,R2    ,R3')).toHaveProperty('error');
});
test('Parse instruction ADD R1,R2,R17', () => {
  expect(parseInstruction('ADD R1,R2,R17')).toHaveProperty('error');
});
test('Parse instruction ADD R1    ,R2    ,R3', () => {
  expect(parseInstruction('ADD R1    ,R2    ,R3')).not.toHaveProperty('error');
});
test('Parse instruction SUB R1,R 2, R 3', () => {
  expect(parseInstruction('SUB R1,R 2, R 3')).toHaveProperty('error');
});
test('Parse instruction ADDI R1,R2,R2', () => {
  expect(parseInstruction('ADDI R1,R2,R2')).toHaveProperty('error');
});
test('Parse instruction ADDI R1,R2,999999999999', () => {
  expect(parseInstruction('ADDI R1,R2,999999999999')).toHaveProperty('error');
});
test('Parse instruction ADDI R1,R2,-234', () => {
  expect(parseInstruction('ADDI R1,R2,-234')).not.toHaveProperty('error');
});
test('Parse instruction MOVE       R1,     R2', () => {
  expect(parseInstruction('MOVE       R1,     R2')).not.toHaveProperty('error');
});
test('Parse instruction MOVE       R1,     500', () => {
  expect(parseInstruction('MOVE       R1,     500')).toHaveProperty('error');
});
test('Parse instruction BEQ R1,R2,-654', () => {
  expect(parseInstruction('BEQ R1,R2,-654')).not.toHaveProperty('error');
});
test('Parse instruction BEQ R1,12,R3', () => {
  expect(parseInstruction('BEQ R1,12,R3')).toHaveProperty('error');
});
test('Parse instruction LW R1, 12  ( R2 )', () => {
  expect(parseInstruction('LW R1, 12  ( R2 )')).not.toHaveProperty('error');
});
test('Parse instruction JUMP R1', () => {
  expect(parseInstruction('JUMP R1')).toHaveProperty('error');
});
test('Parse instruction JUMP -5', () => {
  expect(parseInstruction('JUMP -5')).toHaveProperty('error');
});
test('Parse instruction NOP R1', () => {
  expect(parseInstruction('NOP R1')).toHaveProperty('error');
});
