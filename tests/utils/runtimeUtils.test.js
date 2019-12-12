import * as runtimeUtils from '../../resources/js/utils/runtimeUtils.js';

/* getOperator */
test('Get ADD Operator', () => {
  expect(runtimeUtils.getOperator('ADD')).toBe('+');
});
test('Get ADDI Operator', () => {
  expect(runtimeUtils.getOperator('ADDI')).toBe('+');
});
test('Get JUMP Operator', () => {
  expect(runtimeUtils.getOperator('JUMP')).toBe(-1);
});
test('Get SLT Operator', () => {
  expect(runtimeUtils.getOperator('SLT')).toBe('<');
});
