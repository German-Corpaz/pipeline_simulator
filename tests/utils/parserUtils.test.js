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
test('Get Mnemonic of Instruction: AD R1R2', () => {
  expect(parserUtils.getMnemonic('AD R1R2')).toBe('AD');
});
test('Get Mnemonic of Instruction: SUM R1,R2,R3', () => {
  expect(parserUtils.getMnemonic('SUM R1,R2,R3')).toBe('SUM');
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

/* is valid register number */
test('Is 0 a valid register number', () => {
  expect(parserUtils.isValidRegisterNumber(0)).toBe(true);
});
test('Is 16 a valid register number', () => {
  expect(parserUtils.isValidRegisterNumber(16)).toBe(false);
});
test('Is 7 a valid register number', () => {
  expect(parserUtils.isValidRegisterNumber(7)).toBe(true);
});
test('Is "-1" a valid register number', () => {
  expect(parserUtils.isValidRegisterNumber(-1)).toBe(false);
});

/* get Register Number */
test('Get Register Number of R0', () => {
  expect(parserUtils.getRegisterNumber('R0')).toBe(0);
});
test('Get Register Number of R16', () => {
  expect(parserUtils.getRegisterNumber('R16')).toBe(16);
});
test('Get Register Number of R7', () => {
  expect(parserUtils.getRegisterNumber('R7')).toBe(7);
});
test('Get Register Number of ""', () => {
  expect(parserUtils.getRegisterNumber('')).toBe(-1);
});

/* is valid register  */
test('Is R0 a valid register number', () => {
  expect(parserUtils.isValidRegister('R0')).toBe(true);
});
test('Is R16 a valid register number', () => {
  expect(parserUtils.isValidRegister('R16')).toBe(false);
});
test('Is R7 a valid register number', () => {
  expect(parserUtils.isValidRegister('R7')).toBe(true);
});
test('Is "" a valid register number', () => {
  expect(parserUtils.isValidRegister('')).toBe(false);
});
test('Is r12 a valid register number', () => {
  expect(parserUtils.isValidRegister('r12')).toBe(false);
});

/* is valid constant  */
test('Is 7 a valid constant', () => {
  expect(parserUtils.isValidConstant('7')).toBe(true);
});
test('Is R1 a valid constant', () => {
  expect(parserUtils.isValidConstant('R1')).toBe(false);
});
test('Is 0 a valid constant', () => {
  expect(parserUtils.isValidConstant('0')).toBe(true);
});
test('Is "" a valid constant', () => {
  expect(parserUtils.isValidConstant('')).toBe(false);
});
test('Is 2147483647 a valid constant', () => {
  expect(parserUtils.isValidConstant('2147483647')).toBe(true);
});
test('Is 2147483648 a valid constant', () => {
  expect(parserUtils.isValidConstant('2147483648')).toBe(false);
});
test('Is -2147483648 a valid constant', () => {
  expect(parserUtils.isValidConstant('-2147483648')).toBe(true);
});
test('Is -2147483649 a valid constant', () => {
  expect(parserUtils.isValidConstant('-2147483649')).toBe(false);
});

/* get constant  */
test('Get 7 constant in number', () => {
  expect(parserUtils.getConstant('7')).toBe(7);
});
test('Get 0 constant in number', () => {
  expect(parserUtils.getConstant('0')).toBe(0);
});
test('Get 2147483647 constant in number', () => {
  expect(parserUtils.getConstant('2147483647')).toBe(2147483647);
});
test('Get -2147483648 constant in number', () => {
  expect(parserUtils.getConstant('-2147483648')).toBe(-2147483648);
});

/* get offset */
test('Get offset from 123(r1)', () => {
  expect(parserUtils.getOffset('123(r1)')).toBe(123);
});
test('Get offset from 99999999999(r1)', () => {
  expect(parserUtils.getOffset('99999999999(r1)')).toBe(undefined);
});
test('Get offset from 123r1)', () => {
  expect(parserUtils.getOffset('123r1)')).toBe(undefined);
});
test('Get offset from (r1)', () => {
  expect(parserUtils.getOffset('(r1)')).toBe(undefined);
});
test('Get offset from 0(r1)', () => {
  expect(parserUtils.getOffset('0(r1)')).toBe(0);
});
test('Get offset from -4(r1)', () => {
  expect(parserUtils.getOffset('-4(r1)')).toBe(-4);
});
test('Get offset from -4(invalidregister)', () => {
  expect(parserUtils.getOffset('-4(invalidregister)')).toBe(-4);
});

/* get register from memory */
test('Get register from 123(R1)', () => {
  expect(parserUtils.getRegisterFromMemory('123(R1)')).toBe(1);
});
test('Get register from (R2)', () => {
  expect(parserUtils.getRegisterFromMemory('(R2)')).toBe(2);
});
test('Get register from (R0)', () => {
  expect(parserUtils.getRegisterFromMemory('(R0)')).toBe(0);
});
test('Get register from 123r1)', () => {
  expect(parserUtils.getRegisterFromMemory('123r1)')).toBe(undefined);
});
test('Get register from (R15)', () => {
  expect(parserUtils.getRegisterFromMemory('(R15)')).toBe(15);
});
test('Get register from 0(R128)', () => {
  expect(parserUtils.getRegisterFromMemory('0(R128)')).toBe(undefined);
});
test('Get register from -4(R1)', () => {
  expect(parserUtils.getRegisterFromMemory('-4(R1)')).toBe(1);
});
test('Get register from -4(invalidregister)', () => {
  expect(parserUtils.getRegisterFromMemory('-4(invalidregister)')).toBe(undefined);
});

/* is valid memory access */
test('is Valid Memory Access 123(R1)', () => {
  expect(parserUtils.isValidMemoryAccess('123(R1)')).toBe(true);
});
test('is Valid Memory Access (R2)', () => {
  expect(parserUtils.isValidMemoryAccess('(R2)')).toBe(false);
});
test('is Valid Memory Access 123r1)', () => {
  expect(parserUtils.isValidMemoryAccess('123r1)')).toBe(false);
});
test('is Valid Memory Access (R15)', () => {
  expect(parserUtils.isValidMemoryAccess('(R15)')).toBe(false);
});
test('is Valid Memory Access 0(R128)', () => {
  expect(parserUtils.isValidMemoryAccess('0(R128)')).toBe(false);
});
test('is Valid Memory Access -4(R1)', () => {
  expect(parserUtils.isValidMemoryAccess('-4(R1)')).toBe(true);
});
test('is Valid Memory Access -4(invalidregister)', () => {
  expect(parserUtils.isValidMemoryAccess('-4(invalidregister)')).toBe(false);
});
test('is Valid Memory Access 0(R5)', () => {
  expect(parserUtils.isValidMemoryAccess('0(R5)')).toBe(true);
});

/* is valid jump address */
test('is valid Jump address 123', () => {
  expect(parserUtils.isValidJumpAddress('123')).toBe(true);
});
test('is valid Jump address 0', () => {
  expect(parserUtils.isValidJumpAddress('0')).toBe(true);
});
test('is valid Jump address -4', () => {
  expect(parserUtils.isValidJumpAddress('-4')).toBe(false);
});
test('is valid Jump address 999999999999999', () => {
  expect(parserUtils.isValidJumpAddress('999999999999999')).toBe(false);
});
test('is valid Jump address R2', () => {
  expect(parserUtils.isValidJumpAddress('R2')).toBe(false);
});
