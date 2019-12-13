import * as parserUtils from './utils/parserUtils.js';
import * as runtimeUtils from './utils/runtimeUtils.js';
import * as pipelineUtils from './utils/pipelineUtils.js';
import { architecture } from './architecture.js';
export function noPipelineMatrix(result) {
  const MULT_CYCLES = 4;
  const DIV_CYCLES = 4;
  const READMEMORY_CYCLES = 2;
  const WRITEMEMORY_CYCLES = 2;
  let instructions = result.executedInstructions;

  let matrix = [];
  let cycle = 0;

  for (let i = 0; i < instructions.length; i++) {
    matrix.push([]);
    for (let k = 0; k < cycle; k++) {
      matrix[i].push(null);
    }
    matrix[i].push('F');
    cycle++;
    matrix[i].push('D');
    cycle++;
    if (instructions[i].mnemonic == 'MUL') {
      for (let j = 0; j < MULT_CYCLES; j++) {
        matrix[i].push('E');
        cycle++;
      }
    } else if (instructions[i].mnemonic == 'DIV' || instructions[i].mnemonic == 'REM') {
      for (let j = 0; j < DIV_CYCLES; j++) {
        matrix[i].push('E');
        cycle++;
      }
    } else {
      matrix[i].push('E');
      cycle++;
    }
    if (instructions[i].mnemonic == 'LW') {
      for (let j = 0; j < READMEMORY_CYCLES; j++) {
        matrix[i].push('M');
        cycle++;
      }
    } else if (instructions[i].mnemonic == 'SW') {
      for (let j = 0; j < WRITEMEMORY_CYCLES; j++) {
        matrix[i].push('M');
        cycle++;
      }
    } else {
      matrix[i].push('M');
      cycle++;
    }

    matrix[i].push('WB');
    cycle++;
  }
  let output = {
    matrix,
    instructions
  };
  return output;
}

export function basicPipeline(result) {
  const MULT_CYCLES = 4;
  const DIV_CYCLES = 4;
  const READMEMORY_CYCLES = 2;
  const WRITEMEMORY_CYCLES = 2;
  const JUMP_RESOLVED = 'E';
  const BRANCH_RESOLVED = 'E';

  const MEMORY_SIZE = architecture.memory;
  const MAX_INSTRUCTIONS = architecture.maxInstructions;
  const REGISTERS = architecture.registers;

  let registers = new Array(REGISTERS).fill(0);
  let memory = new Array(MEMORY_SIZE).fill(0);
  let pc = 0;
  let instructions = result.instructions;

  let pipeline = {
    fetchStage: null,
    decodeStage: null,
    memoryStage: null,
    writebackStage: null,
    executeStage: null
  };
  let matrix = [];
  let cycle = 0;
  let instructionsExecuted = [];
  let usedRegisters = [];

  const instructionsInPipe = () => {
    let instructionInPipe = false;
    instructionInPipe =
      pipeline.fetchStage ||
      pipeline.decodeStage ||
      pipeline.executeStage ||
      pipeline.memoryStage ||
      pipeline.writebackStage
        ? true
        : false;
    return instructionInPipe;
  };

  const hazard = instruction => {
    let source1 = instruction.sourceRegister1;
    let source2 = instruction.sourceRegister2;
    let hazard = false;
    if (usedRegisters.indexOf(source1) >= 0 || usedRegisters.indexOf(source2) >= 0) hazard = true;
    return hazard;
  };

  const takeRegister = instruction => {
    if (instruction.destinationRegister != undefined)
      usedRegisters.push(instruction.destinationRegister);
  };

  const releaseRegister = instruction => {
    if (instruction.destinationRegister != undefined)
      usedRegisters.splice(usedRegisters.indexOf(instruction.destinationRegister), 1);
  };
  while (pc < instructions.length || instructionsInPipe()) {
    if (pipeline.writebackStage) {
      let mnemonic = pipeline.writebackStage.instruction.mnemonic;
      if (!(parserUtils.branchInstruction(mnemonic) || parserUtils.jumpInstruction(mnemonic))) {
        let actualState = {
          registers,
          memory,
          pc,
          numberOfInstructions: instructions.length
        };
        let newState = runtimeUtils.executeInstruction(
          pipeline.writebackStage.instruction,
          actualState
        );
        registers = newState.registers;
        memory = newState.memory;
      }
      releaseRegister(pipeline.writebackStage.instruction);
      pipeline.writebackStage = null;
    }
    if (pipeline.memoryStage) {
      let mnemonic = pipeline.memoryStage.instruction.mnemonic;
      if (mnemonic == 'LW') {
        if (pipeline.memoryStage.memoryCycles == READMEMORY_CYCLES) {
          pipeline.writebackStage = pipeline.memoryStage;
          matrix[pipeline.writebackStage.index].push('WB');
          pipeline.memoryStage = null;
        } else {
          pipeline.memoryStage.memoryCycles++;
          matrix[pipeline.memoryStage.index].push('M');
        }
      } else if (mnemonic == 'SW') {
        if (pipeline.memoryStage.memoryCycles == WRITEMEMORY_CYCLES) {
          pipeline.writebackStage = pipeline.memoryStage;
          matrix[pipeline.writebackStage.index].push('WB');
          pipeline.memoryStage = null;
        } else {
          pipeline.memoryStage.memoryCycles++;
          matrix[pipeline.memoryStage.index].push('M');
        }
      } else {
        pipeline.writebackStage = pipeline.memoryStage;
        matrix[pipeline.writebackStage.index].push('WB');
        pipeline.memoryStage = null;
      }
    }
    if (pipeline.executeStage) {
      let mnemonic = pipeline.executeStage.instruction.mnemonic;
      if (mnemonic == 'MUL') {
        if (pipeline.executeStage.executeCycles == MULT_CYCLES) {
          if (pipeline.memoryStage == null) {
            pipeline.memoryStage = pipeline.executeStage;
            matrix[pipeline.memoryStage.index].push('M');
            pipeline.executeStage = null;
          } else {
            matrix[pipeline.executeStage.index].push('S');
          }
        } else {
          pipeline.executeStage.executeCycles++;
          matrix[pipeline.executeStage.index].push('E');
        }
      } else if (mnemonic == 'DIV' || mnemonic == 'REM') {
        if (pipeline.executeStage.executeCycles == DIV_CYCLES) {
          if (pipeline.memoryStage == null) {
            pipeline.memoryStage = pipeline.executeStage;
            matrix[pipeline.memoryStage.index].push('M');
            pipeline.executeStage = null;
          } else {
            matrix[pipeline.executeStage.index].push('S');
          }
        } else {
          pipeline.executeStage.executeCycles++;
          matrix[pipeline.executeStage.index].push('E');
        }
      } else if (parserUtils.branchInstruction(mnemonic) || parserUtils.jumpInstruction(mnemonic)) {
        if (pipeline.executeStage.jumped === undefined) {
          pipeline.executeStage.jumped = true;
          let actualState = {
            registers,
            memory,
            pc,
            numberOfInstructions: instructions.length
          };
          let newState = runtimeUtils.executeInstruction(
            pipeline.executeStage.instruction,
            actualState
          );
          registers = newState.registers;
          memory = newState.memory;
          if (newState.jumped) {
            pc = newState.pc;
            pipeline.fetchStage = null;
            pipeline.decodeStage = null;
          }
          if (pipeline.memoryStage == null) {
            pipeline.memoryStage = pipeline.executeStage;
            pipeline.memoryStage.memoryCycles = 1;
            matrix[pipeline.memoryStage.index].push('M');
            pipeline.executeStage = null;
          } else {
            matrix[pipeline.executeStage.index].push('S');
          }
        } else {
          if (pipeline.memoryStage == null) {
            pipeline.memoryStage = pipeline.executeStage;
            pipeline.memoryStage.memoryCycles = 1;

            matrix[pipeline.memoryStage.index].push('M');
            pipeline.executeStage = null;
          } else {
            matrix[pipeline.executeStage.index].push('S');
          }
        }
      } else {
        if (pipeline.memoryStage == null) {
          pipeline.memoryStage = pipeline.executeStage;
          pipeline.memoryStage.memoryCycles = 1;

          matrix[pipeline.memoryStage.index].push('M');
          pipeline.executeStage = null;
        } else {
          matrix[pipeline.executeStage.index].push('S');
        }
      }
    }
    if (pipeline.decodeStage) {
      if (pipeline.executeStage == null && !hazard(pipeline.decodeStage.instruction)) {
        pipeline.executeStage = pipeline.decodeStage;
        pipeline.executeStage.executeCycles = 1;
        takeRegister(pipeline.executeStage.instruction);
        matrix[pipeline.executeStage.index].push('E');
        pipeline.decodeStage = null;
      } else {
        matrix[pipeline.decodeStage.index].push('S');
      }
    }
    if (pipeline.fetchStage) {
      if (pipeline.decodeStage == null) {
        pipeline.decodeStage = pipeline.fetchStage;
        matrix[pipeline.decodeStage.index].push('D');
        pipeline.fetchStage = null;
      } else {
        matrix[pipeline.fetchStage.index].push('S');
      }
    }
    if (pipeline.fetchStage == null) {
      if (pc < instructions.length) {
        let index = instructionsExecuted.length;
        pipeline.fetchStage = {
          instruction: instructions[pc],
          index: index
        };
        matrix.push([]);
        for (let i = 0; i < cycle; i++) matrix[index].push(null);
        matrix[index].push('F');
        instructionsExecuted.push(instructions[pc]);
        pc++;
      }
    }
    cycle++;
    if (cycle > 500) break;
  }

  let output = { matrix, instructions: instructionsExecuted, registers, memory };
  return output;
}
