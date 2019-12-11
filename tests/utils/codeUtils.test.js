import * as codeUtils from '../../resources/js/utils/codeUtils.js';

test('Split code returns array with 3 sentences', () => {
  expect(codeUtils.splitInLines('sentence 1\nsentence 2\nsentence 3')).toStrictEqual([
    'sentence 1',
    'sentence 2',
    'sentence 3'
  ]);
});
test('Split code returns array with 1 sentences', () => {
  expect(codeUtils.splitInLines('sentence 1')).toStrictEqual(['sentence 1']);
});
test('Split code returns array with 0 sentences', () => {
  expect(codeUtils.splitInLines('')).toStrictEqual(['']);
});
test('Split code returns array with empty sentences', () => {
  expect(codeUtils.splitInLines('\n\n\n\n\n\n')).toStrictEqual(['', '', '', '', '', '', '']);
});

/* Blank Line */
test('Check if empty string is a blank line', () => {
  expect(codeUtils.blankLine('')).toBe(true);
});
test('Check if string with spaces is a blank line', () => {
  expect(codeUtils.blankLine('          ')).toBe(true);
});
test('Check if string with tabs is a blank line', () => {
  expect(codeUtils.blankLine('      ')).toBe(true);
});
test('Check if string with tabs and spaces is a blank line', () => {
  expect(codeUtils.blankLine('                 ')).toBe(true);
});
test('Check if string with tabs (with escape) and spaces is a blank line', () => {
  expect(codeUtils.blankLine('\t\t\t\t')).toBe(true);
});
test('Check if string with tabs and spaces is a blank line', () => {
  expect(codeUtils.blankLine('                 ')).toBe(true);
});
test('Check if string with characters is blank line', () => {
  expect(codeUtils.blankLine('aa')).toBe(false);
});
test('Check if string with characters is blank line', () => {
  expect(codeUtils.blankLine('A')).toBe(false);
});
