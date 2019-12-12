import * as runtimeUtils from './utils/runtimeUtils.js';
import { architecture } from './architecture.js';
export function validateCode(instructions) {
  const MEMORY_SIZE = architecture.memory;
  const MAX_INSTRUCTIONS = architecture.maxInstructions;
  const REGISTERS = architecture.registers;

  let registers = new Array(REGISTERS).fill(0);
  let memory = new Array(MEMORY_SIZE).fill(0);
  let pc = 0;

  let actualInstruction;
  let error = '';
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

    if (newState.error) error = newState.error;
    if (executedInstructions.length > MAX_INSTRUCTIONS)
      error = 'Instruction limit reached (' + MAX_INSTRUCTIONS + ')';
    if (error != '') break;
  }

  const result = {
    registers,
    memory,
    executedInstructions,
    instructionCount: executedInstructions.length
  };
  if (error != '') result.error = error;
  return result;
}
