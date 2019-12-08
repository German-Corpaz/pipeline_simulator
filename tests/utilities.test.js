import * as utilities from '../resources/js/utilities.js';

/* Split in Lines*/
test('Split code returns array with 3 sentences', () => {
  expect(utilities.splitInLines('sentence 1\nsentence 2\nsentence 3')).toStrictEqual([
    'sentence 1',
    'sentence 2',
    'sentence 3'
  ]);
});
test('Split code returns array with 1 sentences', () => {
  expect(utilities.splitInLines('sentence 1')).toStrictEqual(['sentence 1']);
});
test('Split code returns array with 0 sentences', () => {
  expect(utilities.splitInLines('')).toStrictEqual(['']);
});

/* Blank Line */
test('Check if empty string is a blank line', () => {
  expect(utilities.blankLine('')).toBe(true);
});
test('Check if string with spaces is a blank line', () => {
  expect(utilities.blankLine('          ')).toBe(true);
});
test('Check if string with tabs is a blank line', () => {
  expect(utilities.blankLine('      ')).toBe(true);
});
test('Check if string with tabs and spaces is a blank line', () => {
  expect(utilities.blankLine('                 ')).toBe(true);
});
test('Check if string with tabs (with escape) and spaces is a blank line', () => {
  expect(utilities.blankLine('\t\t\t\t')).toBe(true);
});
test('Check if string with tabs and spaces is a blank line', () => {
  expect(utilities.blankLine('                 ')).toBe(true);
});
test('Check if string with characters is blank line', () => {
  expect(utilities.blankLine('aa')).toBe(false);
});
test('Check if string with characters is blank line', () => {
  expect(utilities.blankLine('A')).toBe(false);
});

/* Get Mnemonic*/
test('Get Mnemonic of Instruction: ADD R1,R2,R3', () => {
  expect(utilities.getMnemonic('ADD R1,R2,R3')).toBe('ADD');
});
test('Get Mnemonic of Instruction: JUMP 500', () => {
  expect(utilities.getMnemonic('JUMP 500')).toBe('JUMP');
});
test('Get Mnemonic of Instruction: MUL R1   R2 R3 R1 500', () => {
  expect(utilities.getMnemonic('MUL R1   R2 R3 R1 500')).toBe('MUL');
});
test('Get Mnemonic of Instruction: MOVE R1R2', () => {
  expect(utilities.getMnemonic('MOVE R1R2')).toBe('MOVE');
});

/* Valid Mnemonic */
test('Check valid mnemonic ADD', () => {
  expect(utilities.isValidMnemonic('ADD')).toBe(true);
});
test('Check valid mnemonic add (invalid)', () => {
  expect(utilities.isValidMnemonic('add')).toBe(false);
});
test('Check valid mnemonic ""', () => {
  expect(utilities.isValidMnemonic('')).toBe(false);
});
test('Check valid mnemonic NOP', () => {
  expect(utilities.isValidMnemonic('NOP')).toBe(true);
});
test('Check valid mnemonic MULT (invalid)', () => {
  expect(utilities.isValidMnemonic('MULT')).toBe(false);
});

/* Get parameters */
test('Get Parameters of Instruction: ADD R1,R2,R3', () => {
  expect(utilities.getParameters('ADD R1,R2,R3')).toBe('R1,R2,R3');
});
test('Get Parameters of Instruction: JUMP 500', () => {
  expect(utilities.getParameters('JUMP 500')).toBe('500');
});
test('Get Parameters of Instruction: MUL R1   R2 R3 R1 500', () => {
  expect(utilities.getParameters('MUL R1   R2 R3 R1 500')).toBe('R1R2R3R1500');
});
test('Get Parameters of Instruction: MOVE R1R2', () => {
  expect(utilities.getParameters('MOVE R1R2')).toBe('R1R2');
});
test('Get Parameters of Instruction: MOVE       R1,        R2', () => {
  expect(utilities.getParameters('MOVE       R1,        R2')).toBe('R1,R2');
});
test('Get Parameters of Instruction: ANDI R1,100', () => {
  expect(utilities.getParameters('ANDI R1,100')).toBe('R1,100');
});
test('Get Parameters of Instruction: REM R1 R2 R3', () => {
  expect(utilities.getParameters('REM R1 R2 R3')).toBe('R1R2R3');
});

/* Three Register Instruction */
test('Is ADD a three register instruction', () => {
  expect(utilities.threeRegisterInstruction('ADD')).toBe(true);
});
test('Is MUL a three register instruction', () => {
  expect(utilities.threeRegisterInstruction('MUL')).toBe(true);
});
test('Is JUMP a three register instruction', () => {
  expect(utilities.threeRegisterInstruction('JUMP')).toBe(false);
});
test('Is MOVE a three register instruction', () => {
  expect(utilities.threeRegisterInstruction('MOVE')).toBe(false);
});
test('Is SLR a three register instruction', () => {
  expect(utilities.threeRegisterInstruction('SLR')).toBe(true);
});

/* Instant Instructions */
test('Is ADDI a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction('ADDI')).toBe(true);
});
test('Is MULI a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction('MULI')).toBe(false);
});
test('Is BEQ a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction('BEQ')).toBe(false);
});
test('Is ANDI a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction('ANDI')).toBe(true);
});
test('Is NOP a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction('NOP')).toBe(false);
});

/* Two Register Instruction*/
test('Is MOVE a two register instruction', () => {
  expect(utilities.twoRegisterInstruction('MOVE')).toBe(true);
});
test('Is MULI a two register instruction', () => {
  expect(utilities.twoRegisterInstruction('MULI')).toBe(false);
});
test('Is BEQ a two register instruction', () => {
  expect(utilities.twoRegisterInstruction('BEQ')).toBe(false);
});
test('Is ANDI a two register instruction', () => {
  expect(utilities.twoRegisterInstruction('ANDI')).toBe(false);
});
test('Is NOP a two register instruction', () => {
  expect(utilities.twoRegisterInstruction('NOP')).toBe(false);
});

/* Branch Instruction*/
test('Is MOVE a branch instruction', () => {
  expect(utilities.branchInstruction('MOVE')).toBe(false);
});
test('Is MULI a branch instruction', () => {
  expect(utilities.branchInstruction('MULI')).toBe(false);
});
test('Is BEQ a branch instruction', () => {
  expect(utilities.branchInstruction('BEQ')).toBe(true);
});
test('Is BNE a branch instruction', () => {
  expect(utilities.branchInstruction('BNE')).toBe(true);
});
test('Is NOP a branch instruction', () => {
  expect(utilities.branchInstruction('NOP')).toBe(false);
});

/* Memory Instruction*/
test('Is LW a memory instruction', () => {
  expect(utilities.memoryInstruction('LW')).toBe(true);
});
test('Is SW a memory instruction', () => {
  expect(utilities.memoryInstruction('SW')).toBe(true);
});
test('Is BEQ a memory instruction', () => {
  expect(utilities.memoryInstruction('BEQ')).toBe(false);
});
test('Is ADD a memory instruction', () => {
  expect(utilities.memoryInstruction('ADD')).toBe(false);
});
test('Is NOP a memory instruction', () => {
  expect(utilities.memoryInstruction('NOP')).toBe(false);
});

/* Jump Instruction*/
test('Is LW a memory instruction', () => {
  expect(utilities.jumpInstruction('JUMP')).toBe(true);
});
test('Is SW a memory instruction', () => {
  expect(utilities.jumpInstruction('SW')).toBe(false);
});
test('Is BEQ a memory instruction', () => {
  expect(utilities.jumpInstruction('BEQ')).toBe(false);
});
test('Is ADD a memory instruction', () => {
  expect(utilities.jumpInstruction('ADD')).toBe(false);
});
test('Is NOP a memory instruction', () => {
  expect(utilities.jumpInstruction('NOP')).toBe(false);
});

/* NOP Instruction*/
test('Is LW a memory instruction', () => {
  expect(utilities.nopInstruction('LW')).toBe(false);
});
test('Is SW a memory instruction', () => {
  expect(utilities.nopInstruction('SW')).toBe(false);
});
test('Is BEQ a memory instruction', () => {
  expect(utilities.nopInstruction('BEQ')).toBe(false);
});
test('Is ADD a memory instruction', () => {
  expect(utilities.nopInstruction('ADD')).toBe(false);
});
test('Is NOP a memory instruction', () => {
  expect(utilities.nopInstruction('NOP')).toBe(true);
});

/* is valid register number */
test('Is 0 a valid register number', () => {
  expect(utilities.isValidRegisterNumber(0)).toBe(true);
});
test('Is 16 a valid register number', () => {
  expect(utilities.isValidRegisterNumber(16)).toBe(false);
});
test('Is 7 a valid register number', () => {
  expect(utilities.isValidRegisterNumber(7)).toBe(true);
});
test('Is "-1" a valid register number', () => {
  expect(utilities.isValidRegisterNumber(-1)).toBe(false);
});

/* get Register Number */
test('Get Register Number of R0', () => {
  expect(utilities.getRegisterNumber('R0')).toBe(0);
});
test('Get Register Number of R16', () => {
  expect(utilities.getRegisterNumber('R16')).toBe(16);
});
test('Get Register Number of R7', () => {
  expect(utilities.getRegisterNumber('R7')).toBe(7);
});
test('Get Register Number of ""', () => {
  expect(utilities.getRegisterNumber('')).toBe(-1);
});

/* is valid register  */
test('Is R0 a valid register number', () => {
  expect(utilities.isValidRegister('R0')).toBe(true);
});
test('Is R16 a valid register number', () => {
  expect(utilities.isValidRegister('R16')).toBe(false);
});
test('Is R7 a valid register number', () => {
  expect(utilities.isValidRegister('R7')).toBe(true);
});
test('Is "" a valid register number', () => {
  expect(utilities.isValidRegister('')).toBe(false);
});
test('Is r12 a valid register number', () => {
  expect(utilities.isValidRegister('r12')).toBe(false);
});

/* is valid constant  */
test('Is 7 a valid constant', () => {
  expect(utilities.isValidConstant('7')).toBe(true);
});
test('Is R1 a valid constant', () => {
  expect(utilities.isValidConstant('R1')).toBe(false);
});
test('Is 0 a valid constant', () => {
  expect(utilities.isValidConstant('0')).toBe(true);
});
test('Is "" a valid constant', () => {
  expect(utilities.isValidConstant('')).toBe(false);
});
test('Is 2147483647 a valid constant', () => {
  expect(utilities.isValidConstant('2147483647')).toBe(true);
});
test('Is 2147483648 a valid constant', () => {
  expect(utilities.isValidConstant('2147483648')).toBe(false);
});
test('Is -2147483648 a valid constant', () => {
  expect(utilities.isValidConstant('-2147483648')).toBe(true);
});
test('Is -2147483649 a valid constant', () => {
  expect(utilities.isValidConstant('-2147483649')).toBe(false);
});

/* get constant  */
test('Get 7 constant in number', () => {
  expect(utilities.getConstant('7')).toBe(7);
});
test('Get 0 constant in number', () => {
  expect(utilities.getConstant('0')).toBe(0);
});
test('Get 2147483647 constant in number', () => {
  expect(utilities.getConstant('2147483647')).toBe(2147483647);
});
test('Get -2147483648 constant in number', () => {
  expect(utilities.getConstant('-2147483648')).toBe(-2147483648);
});

/* get offset */
test('Get offset from 123(r1)', () => {
  expect(utilities.getOffset('123(r1)')).toBe(123);
});
test('Get offset from 99999999999(r1)', () => {
  expect(utilities.getOffset('99999999999(r1)')).toBe(undefined);
});
test('Get offset from 123r1)', () => {
  expect(utilities.getOffset('123r1)')).toBe(undefined);
});
test('Get offset from (r1)', () => {
  expect(utilities.getOffset('(r1)')).toBe(undefined);
});
test('Get offset from 0(r1)', () => {
  expect(utilities.getOffset('0(r1)')).toBe(0);
});
test('Get offset from -4(r1)', () => {
  expect(utilities.getOffset('-4(r1)')).toBe(-4);
});
test('Get offset from -4(invalidregister)', () => {
  expect(utilities.getOffset('-4(invalidregister)')).toBe(-4);
});

/* get register from memory */
test('Get register from 123(R1)', () => {
  expect(utilities.getRegisterFromMemory('123(R1)')).toBe(1);
});
test('Get register from (R2)', () => {
  expect(utilities.getRegisterFromMemory('(R2)')).toBe(2);
});
test('Get register from (R0)', () => {
  expect(utilities.getRegisterFromMemory('(R0)')).toBe(0);
});
test('Get register from 123r1)', () => {
  expect(utilities.getRegisterFromMemory('123r1)')).toBe(undefined);
});
test('Get register from (R15)', () => {
  expect(utilities.getRegisterFromMemory('(R15)')).toBe(15);
});
test('Get register from 0(R128)', () => {
  expect(utilities.getRegisterFromMemory('0(R128)')).toBe(undefined);
});
test('Get register from -4(R1)', () => {
  expect(utilities.getRegisterFromMemory('-4(R1)')).toBe(1);
});
test('Get register from -4(invalidregister)', () => {
  expect(utilities.getRegisterFromMemory('-4(invalidregister)')).toBe(undefined);
});

/* is valid memory access */
test('is Valid Memory Access 123(R1)', () => {
  expect(utilities.isValidMemoryAccess('123(R1)')).toBe(true);
});
test('is Valid Memory Access (R2)', () => {
  expect(utilities.isValidMemoryAccess('(R2)')).toBe(false);
});
test('is Valid Memory Access 123r1)', () => {
  expect(utilities.isValidMemoryAccess('123r1)')).toBe(false);
});
test('is Valid Memory Access (R15)', () => {
  expect(utilities.isValidMemoryAccess('(R15)')).toBe(false);
});
test('is Valid Memory Access 0(R128)', () => {
  expect(utilities.isValidMemoryAccess('0(R128)')).toBe(false);
});
test('is Valid Memory Access -4(R1)', () => {
  expect(utilities.isValidMemoryAccess('-4(R1)')).toBe(true);
});
test('is Valid Memory Access -4(invalidregister)', () => {
  expect(utilities.isValidMemoryAccess('-4(invalidregister)')).toBe(false);
});
test('is Valid Memory Access 0(R5)', () => {
  expect(utilities.isValidMemoryAccess('0(R5)')).toBe(true);
});

/* is valid jump address */
test('is valid Jump address 123', () => {
  expect(utilities.isValidJumpAddress('123')).toBe(true);
});
test('is valid Jump address 0', () => {
  expect(utilities.isValidJumpAddress('0')).toBe(true);
});
test('is valid Jump address -4', () => {
  expect(utilities.isValidJumpAddress('-4')).toBe(false);
});
test('is valid Jump address 999999999999999', () => {
  expect(utilities.isValidJumpAddress('999999999999999')).toBe(false);
});
test('is valid Jump address R2', () => {
  expect(utilities.isValidJumpAddress('R2')).toBe(false);
});

/* getOperator */
test('Get ADD Operator', () => {
  expect(utilities.getOperator('ADD')).toBe('+');
});
test('Get ADDI Operator', () => {
  expect(utilities.getOperator('ADDI')).toBe('+');
});
test('Get JUMP Operator', () => {
  expect(utilities.getOperator('JUMP')).toBe(-1);
});
test('Get SLT Operator', () => {
  expect(utilities.getOperator('SLT')).toBe('<');
});
