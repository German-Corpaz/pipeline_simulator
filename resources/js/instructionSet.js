export const instructions = [
  'ADD',
  'ADDI',
  'SUB',
  'MUL',
  'DIV',
  'REM',
  'AND',
  'ANDI',
  'OR',
  'ORI',
  'XOR',
  'XORI',
  'SLT',
  'SLTI',
  'SLL',
  'SLR',
  'MOVE',
  'BEQ',
  'BNE',
  'LW',
  'SW',
  'JUMP',
  'NOP'
];

export const threeRegisterMnemonics = [
  'ADD',
  'SUB',
  'MUL',
  'DIV',
  'REM',
  'AND',
  'OR',
  'XOR',
  'SLT',
  'SLL',
  'SLR'
];

export const twoRegisterOneConstantMnemonics = ['ADDI', 'ANDI', 'ORI', 'XORI', 'SLTI'];

export const twoRegisterMnemonics = ['MOVE'];

export const branchMnemonics = ['BEQ', 'BNE'];

export const memoryMnemonics = ['LW', 'SW'];

export const jumpMnemonics = ['JUMP'];

export const nopMnemonics = ['NOP'];
