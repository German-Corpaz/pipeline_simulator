import * as utilities from "../resources/js/utilities.js";

/* Split in Lines*/
test('Split code returns array with 3 sentences', () => {
  expect(utilities.splitInLines("sentence 1\nsentence 2\nsentence 3")).toStrictEqual(["sentence 1","sentence 2","sentence 3"]);
});
test('Split code returns array with 1 sentences', () => {
  expect(utilities.splitInLines("sentence 1")).toStrictEqual(["sentence 1"]);
});
test('Split code returns array with 0 sentences', () => {
  expect(utilities.splitInLines("")).toStrictEqual([""]);
});

/* Blank Line */
test('Check if empty string is a blank line', () => {
  expect(utilities.blankLine("")).toBe(true);
});
test('Check if string with spaces is a blank line', () => {
  expect(utilities.blankLine("          ")).toBe(true);
});
test('Check if string with tabs is a blank line', () => {
  expect(utilities.blankLine("      ")).toBe(true);
});
test('Check if string with tabs and spaces is a blank line', () => {
  expect(utilities.blankLine("                 ")).toBe(true);
});
test('Check if string with tabs (with escape) and spaces is a blank line', () => {
  expect(utilities.blankLine("\t\t\t\t")).toBe(true);
});
test('Check if string with tabs and spaces is a blank line', () => {
  expect(utilities.blankLine("                 ")).toBe(true);
});
test('Check if string with characters is blank line', () => {
  expect(utilities.blankLine("aa")).toBe(false);
});
test('Check if string with characters is blank line', () => {
  expect(utilities.blankLine("A")).toBe(false);
});

/* Get Mnemonic*/
test('Get Mnemonic of Instruction: ADD R1,R2,R3', () => {
  expect(utilities.getMnemonic("ADD R1,R2,R3")).toBe("ADD");
});
test('Get Mnemonic of Instruction: JUMP 500', () => {
  expect(utilities.getMnemonic("JUMP 500")).toBe("JUMP");
});
test('Get Mnemonic of Instruction: MUL R1   R2 R3 R1 500', () => {
  expect(utilities.getMnemonic("MUL R1   R2 R3 R1 500")).toBe("MUL");
});
test('Get Mnemonic of Instruction: MOVE R1R2', () => {
  expect(utilities.getMnemonic("MOVE R1R2")).toBe("MOVE");
});

/* Valid Mnemonic */
test('Check valid mnemonic ADD', () => {
  expect(utilities.isValidMnemonic("ADD")).toBe(true);
});
test('Check valid mnemonic add (invalid)', () => {
  expect(utilities.isValidMnemonic("add")).toBe(false);
});
test('Check valid mnemonic ""', () => {
  expect(utilities.isValidMnemonic("")).toBe(false);
});
test('Check valid mnemonic NOP', () => {
  expect(utilities.isValidMnemonic("NOP")).toBe(true);
});
test('Check valid mnemonic MULT (invalid)', () => {
  expect(utilities.isValidMnemonic("MULT")).toBe(false);
});

/* Get parameters */
test('Get Parameters of Instruction: ADD R1,R2,R3', () => {
  expect(utilities.getParameters("ADD R1,R2,R3")).toBe("R1,R2,R3");
});
test('Get Parameters of Instruction: JUMP 500', () => {
  expect(utilities.getParameters("JUMP 500")).toBe("500");
});
test('Get Parameters of Instruction: MUL R1   R2 R3 R1 500', () => {
  expect(utilities.getParameters("MUL R1   R2 R3 R1 500")).toBe("R1R2R3R1500");
});
test('Get Parameters of Instruction: MOVE R1R2', () => {
  expect(utilities.getParameters("MOVE R1R2")).toBe("R1R2");
});
test('Get Parameters of Instruction: MOVE       R1,        R2', () => {
  expect(utilities.getParameters("MOVE       R1,        R2")).toBe("R1,R2");
});
test('Get Parameters of Instruction: ANDI R1,100', () => {
  expect(utilities.getParameters("ANDI R1,100")).toBe("R1,100");
});
test('Get Parameters of Instruction: REM R1 R2 R3', () => {
  expect(utilities.getParameters("REM R1 R2 R3")).toBe("R1R2R3");
});

/* Three Register Instruction */
test('Is ADD a three register instruction', () => {
  expect(utilities.threeRegisterInstruction("ADD")).toBe(true);
});
test('Is MUL a three register instruction', () => {
  expect(utilities.threeRegisterInstruction("MUL")).toBe(true);
});
test('Is JUMP a three register instruction', () => {
  expect(utilities.threeRegisterInstruction("JUMP")).toBe(false);
});
test('Is MOVE a three register instruction', () => {
  expect(utilities.threeRegisterInstruction("MOVE")).toBe(false);
});
test('Is SLR a three register instruction', () => {
  expect(utilities.threeRegisterInstruction("SLR")).toBe(true);
});

/* Instant Instructions */
test('Is ADDI a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction("ADDI")).toBe(true);
});
test('Is MULI a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction("MULI")).toBe(false);
});
test('Is BEQ a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction("BEQ")).toBe(false);
});
test('Is ANDI a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction("ANDI")).toBe(true);
});
test('Is NOP a inmediate', () => {
  expect(utilities.twoRegistersOneConstantInstruction("NOP")).toBe(false);
});

/* Two Register Instruction*/
test('Is MOVE a two register instruction', () => {
  expect(utilities.twoRegisterInstruction("MOVE")).toBe(true);
});
test('Is MULI a two register instruction', () => {
  expect(utilities.twoRegisterInstruction("MULI")).toBe(false);
});
test('Is BEQ a two register instruction', () => {
  expect(utilities.twoRegisterInstruction("BEQ")).toBe(false);
});
test('Is ANDI a two register instruction', () => {
  expect(utilities.twoRegisterInstruction("ANDI")).toBe(false);
});
test('Is NOP a two register instruction', () => {
  expect(utilities.twoRegisterInstruction("NOP")).toBe(false);
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
  expect(utilities.getRegisterNumber("R0")).toBe(0);
});
test('Get Register Number of R16', () => {
  expect(utilities.getRegisterNumber("R16")).toBe(16);
});
test('Get Register Number of R7', () => {
  expect(utilities.getRegisterNumber("R7")).toBe(7);
});
test('Get Register Number of ""', () => {
  expect(utilities.getRegisterNumber("")).toBe(-1);
});

/* is valid register  */
test('Is R0 a valid register number', () => {
  expect(utilities.isValidRegister("R0")).toBe(true);
});
test('Is R16 a valid register number', () => {
  expect(utilities.isValidRegister("R16")).toBe(false);
});
test('Is R7 a valid register number', () => {
  expect(utilities.isValidRegister("R7")).toBe(true);
});
test('Is "" a valid register number', () => {
  expect(utilities.isValidRegister("")).toBe(false);
});
test('Is r12 a valid register number', () => {
  expect(utilities.isValidRegister("r12")).toBe(false);
});

/* is valid constant  */
test('Is 7 a valid constant', () => {
  expect(utilities.isValidConstant("7")).toBe(true);
});
test('Is R1 a valid constant', () => {
  expect(utilities.isValidConstant("R1")).toBe(false);
});
test('Is 0 a valid constant', () => {
  expect(utilities.isValidConstant("0")).toBe(true);
});
test('Is "" a valid constant', () => {
  expect(utilities.isValidConstant("")).toBe(false);
});
test('Is 2147483647 a valid constant', () => {
  expect(utilities.isValidConstant("2147483647")).toBe(true);
});
test('Is 2147483648 a valid constant', () => {
  expect(utilities.isValidConstant("2147483648")).toBe(false);
});
test('Is -2147483648 a valid constant', () => {
  expect(utilities.isValidConstant("-2147483648")).toBe(true);
});
test('Is -2147483649 a valid constant' , () => {
  expect(utilities.isValidConstant("-2147483649")).toBe(false);
});

/* get constant  */
test('Get 7 constant in number', () => {
  expect(utilities.getConstant("7")).toBe(7);
});
test('Get 0 constant in number', () => {
  expect(utilities.getConstant("0")).toBe(0);
});
test('Get 2147483647 constant in number', () => {
  expect(utilities.getConstant("2147483647")).toBe(2147483647);
});
test('Get -2147483648 constant in number', () => {
  expect(utilities.getConstant("-2147483648")).toBe(-2147483648);
});

