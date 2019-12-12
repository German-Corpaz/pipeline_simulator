export function operateOnRegisters(registers, variables) {
  let dest = variables.destinationRegister;
  let source1 = variables.sourceRegister1;
  let source2 = variables.sourceRegister2;
  let operation = variables.operator;
  switch (operation) {
    case '+':
      registers[dest] = registers[source1] + registers[source2];
      break;
    case '-':
      registers[dest] = registers[source1] - registers[source2];
      break;
    case '*':
      registers[dest] = registers[source1] * registers[source2];
      break;
    case '/':
      registers[dest] = Math.floor(registers[source1] / registers[source2]);
      break;
    case '%':
      registers[dest] = registers[source1] % registers[source2];
      break;
    case '&':
      registers[dest] = registers[source1] & registers[source2];
      break;
    case '|':
      registers[dest] = registers[source1] | registers[source2];
      break;
    case '^':
      registers[dest] = registers[source1] ^ registers[source2];
      break;
    case '<':
      registers[dest] = registers[source1] < registers[source2] ? 1 : 0;
      break;
    case '<<':
      registers[dest] = registers[source1] << registers[source2];
      break;
    case '>>':
      registers[dest] = registers[source1] >> registers[source2];
      break;
    default:
  }
  return registers;
}
export function operateOnRegistersAndConstant(registers, variables) {
  let dest = variables.destinationRegister;
  let source = variables.sourceRegister1;
  let constant = variables.constant;
  let operation = variables.operator;
  switch (operation) {
    case '+':
      registers[dest] = registers[source] + constant;
      break;
    case '&':
      registers[dest] = registers[source] & constant;
      break;
    case '|':
      registers[dest] = registers[source] | constant;
      break;
    case '^':
      registers[dest] = registers[source] ^ constant;
      break;
    case '<':
      registers[dest] = registers[source] < constant ? 1 : 0;
      break;
  }
  return registers;
}
