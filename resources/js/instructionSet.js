export const memorySize = 128;
export const numberOfRegisters = 16;
export const maxInstructions = 200;
export const multCycles = 4;
export const divCycles = 4;
export const writeMemoryCycles = 2;
export const readMemoryCycles = 2;
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
