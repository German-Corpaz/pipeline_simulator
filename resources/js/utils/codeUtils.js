export function splitInLines(code) {
  return code.split('\n');
}

export function blankLine(line) {
  let removedSpaces = line.replace(/\s/g, '');
  return removedSpaces == '';
}
