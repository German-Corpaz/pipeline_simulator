import * as runtimeUtils from './utils/runtimeUtils.js';
import * as instructionSet from './instructionSet.js';
export function validateCode(instructions) {
  const MEMORY_SIZE = instructionSet.memorySize;
  const MAX_INSTRUCTIONS = instructionSet.maxInstructions;
  const REGISTERS = instructionSet.numberOfRegisters;

  let registers = new Array(REGISTERS).fill(0);
  let memory = new Array(MEMORY_SIZE).fill(0);
  let pc = 0;

  let actualInstruction;
  let errorMessage = '';
  let executedInstructions = [];

  while (pc >= 0 && pc < instructions.length) {
    actualInstruction = instructions[pc];
    executedInstructions.push(actualInstruction);
    pc++;
    let actualState = {
      registers,
      memory,
      pc,
      numberOfInstructions: instructions.length
    };
    let newState = runtimeUtils.executeInstruction(actualInstruction, actualState);

    registers = newState.registers;
    memory = newState.memory;
    pc = newState.pc;

    if (newState.errorMessage) errorMessage = newState.errorMessage;
    if (executedInstructions.length > MAX_INSTRUCTIONS)
      errorMessage = 'Instruction limit reached (' + MAX_INSTRUCTIONS + ')';
    if (errorMessage != '') break;
  }

  const result = {
    registers,
    memory,
    executedInstructions,
    instructionCount: executedInstructions.length
  };
  if (errorMessage != '') result.errorMessage = errorMessage;
  return result;
}
