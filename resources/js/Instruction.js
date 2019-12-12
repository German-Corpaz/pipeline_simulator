import * as parserUtils from './utils/parserUtils.js';
export default class Instruction {
  constructor(instruction, index) {
    let instructionData = parseInstruction(instruction.trim());
    this.index = index;
    if (instructionData.fullInstruction !== undefined)
      this.fullInstruction = instructionData.fullInstruction;
    if (instructionData.mnemonic !== undefined) this.mnemonic = instructionData.mnemonic;
    if (instructionData.destinationRegister !== undefined)
      this.destinationRegister = instructionData.destinationRegister;
    if (instructionData.sourceRegister1 !== undefined)
      this.sourceRegister1 = instructionData.sourceRegister1;
    if (instructionData.sourceRegister2 !== undefined)
      this.sourceRegister2 = instructionData.sourceRegister2;
    if (instructionData.constant !== undefined) this.constant = instructionData.constant;
    if (instructionData.branchAddress !== undefined)
      this.branchAddress = instructionData.branchAddress;
    if (instructionData.memoryOffset !== undefined)
      this.memoryOffset = instructionData.memoryOffset;
    if (instructionData.jumpAddress !== undefined) this.jumpAddress = instructionData.jumpAddress;
    if (instructionData.error !== undefined) this.error = instructionData.error;
  }
}

export function parseInstruction(instruction) {
  let mnemonic = parserUtils.getMnemonic(instruction);
  let parameters;
  let fullInstruction;
  let parseResult = {};
  let sourceRegister1;
  let sourceRegister2;
  let destinationRegister;
  let constant;
  let branchAddress;
  let memoryOffset;
  let jumpAddress;
  if (parserUtils.isValidMnemonic(mnemonic)) {
    parameters = parserUtils.getParameters(instruction);
    fullInstruction = mnemonic + ' ' + parameters;
    let arrayParameters = parameters.split(',');
    if (parserUtils.threeRegisterInstruction(mnemonic)) {
      if (arrayParameters.length != 3) {
        parseResult.error =
          'The instruction ' + mnemonic + " takes three Registers separated with ',' as parameters";
      } else {
        if (parserUtils.isValidRegister(arrayParameters[2])) {
          sourceRegister2 = parserUtils.getRegisterNumber(arrayParameters[2]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[2];
        }
        if (parserUtils.isValidRegister(arrayParameters[1])) {
          sourceRegister1 = parserUtils.getRegisterNumber(arrayParameters[1]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[1];
        }
        if (parserUtils.isValidRegister(arrayParameters[0])) {
          destinationRegister = parserUtils.getRegisterNumber(arrayParameters[0]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[0];
        }
      }
    } else if (parserUtils.twoRegistersOneConstantInstruction(mnemonic)) {
      if (arrayParameters.length != 3) {
        parseResult.error =
          'The instruction ' +
          mnemonic +
          " takes two Registers and one Constant separated with ',' as parameters";
      } else {
        if (parserUtils.isValidConstant(arrayParameters[2])) {
          constant = parserUtils.getConstant(arrayParameters[2]);
        } else {
          parseResult.error = 'Invalid Constant ' + arrayParameters[2];
        }
        if (parserUtils.isValidRegister(arrayParameters[1])) {
          sourceRegister1 = parserUtils.getRegisterNumber(arrayParameters[1]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[1];
        }
        if (parserUtils.isValidRegister(arrayParameters[0])) {
          destinationRegister = parserUtils.getRegisterNumber(arrayParameters[0]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[0];
        }
      }
    } else if (parserUtils.twoRegisterInstruction(mnemonic)) {
      if (arrayParameters.length != 2) {
        parseResult.error =
          'The instruction ' + mnemonic + " takes two Registers separated with ',' as parameters";
      } else {
        if (parserUtils.isValidRegister(arrayParameters[1])) {
          sourceRegister1 = parserUtils.getRegisterNumber(arrayParameters[1]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[1];
        }
        if (parserUtils.isValidRegister(arrayParameters[0])) {
          destinationRegister = parserUtils.getRegisterNumber(arrayParameters[0]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[0];
        }
      }
    } else if (parserUtils.branchInstruction(mnemonic)) {
      if (arrayParameters.length != 3) {
        parseResult.error =
          'The instruction ' +
          mnemonic +
          " takes two Registers and one relative address separated with ',' as parameters";
      } else {
        if (parserUtils.isValidConstant(arrayParameters[2])) {
          branchAddress = parserUtils.getConstant(arrayParameters[2]);
        } else {
          parseResult.error = 'Invalid Branch Address ' + arrayParameters[2];
        }
        if (parserUtils.isValidRegister(arrayParameters[1])) {
          sourceRegister1 = parserUtils.getRegisterNumber(arrayParameters[1]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[1];
        }
        if (parserUtils.isValidRegister(arrayParameters[0])) {
          sourceRegister2 = parserUtils.getRegisterNumber(arrayParameters[0]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[0];
        }
      }
    } else if (parserUtils.memoryInstruction(mnemonic)) {
      if (arrayParameters.length != 2) {
        parseResult.error =
          'The instruction ' +
          mnemonic +
          " takes one Registers and one memory access separated with ',' as parameters";
      } else {
        if (parserUtils.isValidMemoryAccess(arrayParameters[1])) {
          memoryOffset = parserUtils.getOffset(arrayParameters[1]);
          sourceRegister1 = parserUtils.getRegisterFromMemory(arrayParameters[1]);
        } else {
          parseResult.error = 'Invalid memory access ' + arrayParameters[1];
        }
        if (parserUtils.isValidRegister(arrayParameters[0])) {
          if (mnemonic == 'LW')
            destinationRegister = parserUtils.getRegisterNumber(arrayParameters[0]);
          else if (mnemonic == 'SW')
            sourceRegister2 = parserUtils.getRegisterNumber(arrayParameters[0]);
        } else {
          parseResult.error = 'Invalid Register ' + arrayParameters[0];
        }
      }
    } else if (parserUtils.jumpInstruction(mnemonic)) {
      if (arrayParameters.length != 1 || arrayParameters[0] == '') {
        parseResult.error =
          'The instruction ' + mnemonic + ' takes one positive constant as parameter';
      } else {
        if (parserUtils.isValidJumpAddress(arrayParameters[0])) {
          jumpAddress = parserUtils.getConstant(arrayParameters[0]);
        } else {
          parseResult.error = 'Invalid jump address ' + arrayParameters[0];
        }
      }
    } else if (parserUtils.nopInstruction(mnemonic)) {
      if (arrayParameters.length != 1 || arrayParameters[0] != '') {
        parseResult.error = 'The instruction ' + mnemonic + " doesn't take parameters";
      }
    } else {
      parseResult.error = 'Mnemonic not found ' + mnemonic;
    }
  } else {
    parseResult.error = 'Invalid Mnemonic ' + mnemonic;
  }

  parseResult.fullInstruction = fullInstruction;
  parseResult.mnemonic = mnemonic;
  parseResult.destinationRegister = destinationRegister;
  parseResult.sourceRegister1 = sourceRegister1;
  parseResult.sourceRegister2 = sourceRegister2;
  parseResult.constant = constant;
  parseResult.branchAddress = branchAddress;
  parseResult.memoryOffset = memoryOffset;
  parseResult.jumpAddress = jumpAddress;

  return parseResult;
}
