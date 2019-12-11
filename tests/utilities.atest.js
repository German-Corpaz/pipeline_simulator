import * as utilities from '../resources/js/utilities.js';

/* Split in Lines*/

/* Get parameters */

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
