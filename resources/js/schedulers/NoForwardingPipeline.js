import * as parserUtils from '../utils/parserUtils.js';
import * as runtimeUtils from '../utils/runtimeUtils.js';
import { architecture } from '../architecture.js';

export class NoForwardingPipeline {
  constructor(codeExecutionResult) {
    let data = basicPipeline(codeExecutionResult);
    this.instructions = data.instructions;
    this.matrix = data.matrix;
  }
}

export function basicPipeline(result) {
  const MULT_DIV_CYCLES = 4;

  const MEMORY_SIZE = architecture.memory;
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
      pipeline.writebackStage = pipeline.memoryStage;
      matrix[pipeline.writebackStage.index].push('WB');
      pipeline.memoryStage = null;
    }

    if (pipeline.executeStage) {
      let mnemonic = pipeline.executeStage.instruction.mnemonic;
      if (mnemonic == 'MUL' || mnemonic == 'DIV' || mnemonic == 'REM') {
        if (pipeline.executeStage.executeCycles == MULT_DIV_CYCLES) {
          pipeline.memoryStage = pipeline.executeStage;
          matrix[pipeline.memoryStage.index].push('M');
          pipeline.executeStage = null;
        } else {
          pipeline.executeStage.executeCycles++;
          matrix[pipeline.executeStage.index].push('E');
        }
      } else if (parserUtils.branchInstruction(mnemonic) || parserUtils.jumpInstruction(mnemonic)) {
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
        } else {
          pc = pipeline.executeStage.instruction.index + 1;
        }
        pipeline.memoryStage = pipeline.executeStage;
        matrix[pipeline.memoryStage.index].push('M');
        pipeline.executeStage = null;
      } else {
        pipeline.memoryStage = pipeline.executeStage;
        matrix[pipeline.memoryStage.index].push('M');
        pipeline.executeStage = null;
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
      if (pc == -1) {
        let index = instructionsExecuted.length;
        matrix.push([]);
        for (let i = 0; i < cycle; i++) matrix[index].push(null);
        matrix[index].push('S');
        instructionsExecuted.push({
          fullInstruction: 'STALL'
        });
      } else if (pc < instructions.length) {
        let index = instructionsExecuted.length;
        pipeline.fetchStage = {
          instruction: instructions[pc],
          index: index
        };
        matrix.push([]);
        for (let i = 0; i < cycle; i++) matrix[index].push(null);
        matrix[index].push('F');
        instructionsExecuted.push(instructions[pc]);
        if (
          parserUtils.branchInstruction(instructions[pc].mnemonic) ||
          parserUtils.jumpInstruction(instructions[pc].mnemonic)
        ) {
          pc = -1;
        } else {
          pc++;
        }
      }
    }

    cycle++;
    if (cycle > 500) break;
  }

  let output = { matrix, instructions: instructionsExecuted, registers, memory };
  return output;
}
