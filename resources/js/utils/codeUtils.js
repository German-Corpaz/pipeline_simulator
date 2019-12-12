export function getCodeLines(code) {
  let lines = code.split('\n');
  let notBlankLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (!blankLine(lines[i])) notBlankLines.push(lines[i]);
  }
  return notBlankLines;
}

export function blankLine(line) {
  let removedSpaces = line.replace(/\s/g, '');
  return removedSpaces == '';
}
