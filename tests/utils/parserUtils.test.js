import * as parserUtils from '../../resources/js/utils/parserUtils.js';

/* Get Mnemonic*/
test('Get Mnemonic of Instruction: ADD R1,R2,R3', () => {
  expect(parserUtils.getMnemonic('ADD R1,R2,R3')).toBe('ADD');
});
test('Get Mnemonic of Instruction: JUMP 500', () => {
  expect(parserUtils.getMnemonic('JUMP 500')).toBe('JUMP');
});
test('Get Mnemonic of Instruction: MUL R1   R2 R3 R1 500', () => {
  expect(parserUtils.getMnemonic('MUL R1   R2 R3 R1 500')).toBe('MUL');
});
test('Get Mnemonic of Instruction: MOVE R1R2', () => {
  expect(parserUtils.getMnemonic('MOVE R1R2')).toBe('MOVE');
});

/* Valid Mnemonic */
test('Check valid mnemonic ADD', () => {
  expect(parserUtils.isValidMnemonic('ADD')).toBe(true);
});
test('Check valid mnemonic add (invalid)', () => {
  expect(parserUtils.isValidMnemonic('add')).toBe(false);
});
test('Check valid mnemonic ""', () => {
  expect(parserUtils.isValidMnemonic('')).toBe(false);
});
test('Check valid mnemonic NOP', () => {
  expect(parserUtils.isValidMnemonic('NOP')).toBe(true);
});
test('Check valid mnemonic MULT (invalid)', () => {
  expect(parserUtils.isValidMnemonic('MULT')).toBe(false);
});
/* Get parameters */
test('Get Parameters of Instruction: ADD R1,R2,R3', () => {
  expect(parserUtils.getParameters('ADD R1,R2,R3')).toBe('R1,R2,R3');
});
test('Get Parameters of Instruction: JUMP 500', () => {
  expect(parserUtils.getParameters('JUMP 500')).toBe('500');
});
test('Get Parameters of Instruction: MUL R1   R2 R3 R1 500', () => {
  expect(parserUtils.getParameters('MUL R1   R2 R3 R1 500')).toBe('R1   R2 R3 R1 500');
});
test('Get Parameters of Instruction: MOVE R1R2', () => {
  expect(parserUtils.getParameters('MOVE R1R2')).toBe('R1R2');
});
test('Get Parameters of Instruction: MOVE       R1,        R2', () => {
  expect(parserUtils.getParameters('MOVE       R1,        R2')).toBe('R1,R2');
});
test('Get Parameters of Instruction: ANDI R1,100', () => {
  expect(parserUtils.getParameters('ANDI R1,100')).toBe('R1,100');
});
test('Get Parameters of Instruction: REM R1 R2 R3', () => {
  expect(parserUtils.getParameters('REM R1 R2 R3')).toBe('R1 R2 R3');
});
test('Get Parameters of Instruction: REM R  1 R  2 R  3', () => {
  expect(parserUtils.getParameters('REM R  1 R  2 R  3')).toBe('R  1 R  2 R  3');
});
test('Get Parameters of Instruction: BEQ R1,R     5 ,   2', () => {
  expect(parserUtils.getParameters('BEQ R1,R     5 ,   2')).toBe('R1,R     5,2');
});

/* Three Register Instruction */
test('Is ADD a three register instruction', () => {
  expect(parserUtils.threeRegisterInstruction('ADD')).toBe(true);
});
test('Is MUL a three register instruction', () => {
  expect(parserUtils.threeRegisterInstruction('MUL')).toBe(true);
});
test('Is JUMP a three register instruction', () => {
  expect(parserUtils.threeRegisterInstruction('JUMP')).toBe(false);
});
test('Is MOVE a three register instruction', () => {
  expect(parserUtils.threeRegisterInstruction('MOVE')).toBe(false);
});
test('Is SLR a three register instruction', () => {
  expect(parserUtils.threeRegisterInstruction('SLR')).toBe(true);
});

/* Instant Instructions */
test('Is ADDI a inmediate', () => {
  expect(parserUtils.twoRegistersOneConstantInstruction('ADDI')).toBe(true);
});
test('Is MULI a inmediate', () => {
  expect(parserUtils.twoRegistersOneConstantInstruction('MULI')).toBe(false);
});
test('Is BEQ a inmediate', () => {
  expect(parserUtils.twoRegistersOneConstantInstruction('BEQ')).toBe(false);
});
test('Is ANDI a inmediate', () => {
  expect(parserUtils.twoRegistersOneConstantInstruction('ANDI')).toBe(true);
});
test('Is NOP a inmediate', () => {
  expect(parserUtils.twoRegistersOneConstantInstruction('NOP')).toBe(false);
});

/* Two Register Instruction*/
test('Is MOVE a two register instruction', () => {
  expect(parserUtils.twoRegisterInstruction('MOVE')).toBe(true);
});
test('Is MULI a two register instruction', () => {
  expect(parserUtils.twoRegisterInstruction('MULI')).toBe(false);
});
test('Is BEQ a two register instruction', () => {
  expect(parserUtils.twoRegisterInstruction('BEQ')).toBe(false);
});
test('Is ANDI a two register instruction', () => {
  expect(parserUtils.twoRegisterInstruction('ANDI')).toBe(false);
});
test('Is NOP a two register instruction', () => {
  expect(parserUtils.twoRegisterInstruction('NOP')).toBe(false);
});

/* Branch Instruction*/
test('Is MOVE a branch instruction', () => {
  expect(parserUtils.branchInstruction('MOVE')).toBe(false);
});
test('Is MULI a branch instruction', () => {
  expect(parserUtils.branchInstruction('MULI')).toBe(false);
});
test('Is BEQ a branch instruction', () => {
  expect(parserUtils.branchInstruction('BEQ')).toBe(true);
});
test('Is BNE a branch instruction', () => {
  expect(parserUtils.branchInstruction('BNE')).toBe(true);
});
test('Is NOP a branch instruction', () => {
  expect(parserUtils.branchInstruction('NOP')).toBe(false);
});

/* Memory Instruction*/
test('Is LW a memory instruction', () => {
  expect(parserUtils.memoryInstruction('LW')).toBe(true);
});
test('Is SW a memory instruction', () => {
  expect(parserUtils.memoryInstruction('SW')).toBe(true);
});
test('Is BEQ a memory instruction', () => {
  expect(parserUtils.memoryInstruction('BEQ')).toBe(false);
});
test('Is ADD a memory instruction', () => {
  expect(parserUtils.memoryInstruction('ADD')).toBe(false);
});
test('Is NOP a memory instruction', () => {
  expect(parserUtils.memoryInstruction('NOP')).toBe(false);
});

/* Jump Instruction*/
test('Is LW a memory instruction', () => {
  expect(parserUtils.jumpInstruction('JUMP')).toBe(true);
});
test('Is SW a memory instruction', () => {
  expect(parserUtils.jumpInstruction('SW')).toBe(false);
});
test('Is BEQ a memory instruction', () => {
  expect(parserUtils.jumpInstruction('BEQ')).toBe(false);
});
test('Is ADD a memory instruction', () => {
  expect(parserUtils.jumpInstruction('ADD')).toBe(false);
});
test('Is NOP a memory instruction', () => {
  expect(parserUtils.jumpInstruction('NOP')).toBe(false);
});

/* NOP Instruction*/
test('Is LW a memory instruction', () => {
  expect(parserUtils.nopInstruction('LW')).toBe(false);
});
test('Is SW a memory instruction', () => {
  expect(parserUtils.nopInstruction('SW')).toBe(false);
});
test('Is BEQ a memory instruction', () => {
  expect(parserUtils.nopInstruction('BEQ')).toBe(false);
});
test('Is ADD a memory instruction', () => {
  expect(parserUtils.nopInstruction('ADD')).toBe(false);
});
test('Is NOP a memory instruction', () => {
  expect(parserUtils.nopInstruction('NOP')).toBe(true);
});
