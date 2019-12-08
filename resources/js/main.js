import { setupEditor } from './setupEditor.js';
import { validateCode } from './codeValidator.js';
import * as utilities from './utilities.js';
import Instruction from './Instruction.js';

const editor = setupEditor();

setupListeners();

function setupListeners() {
  $('.primary').click(mainCode);
}
function mainCode() {
  let editorCode = editor.getValue().toUpperCase();
  let codeLines = utilities.splitInLines(editorCode);
  let instructions = [];
  let parsingError = '';
  let i = 0;
  for (i = 0; i < codeLines.length; i++) {
    let line = codeLines[i];
    if (!utilities.blankLine(line)) {
      let newInstruction = new Instruction(line);
      if (newInstruction.error) {
        parsingError = newInstruction.error;
        break;
      } else {
        instructions.push(newInstruction);
      }
    }
  }

  let codeValidationResult;
  if (parsingError) {
    i++;
    console.log('Parsing ERROR on line ' + i + '\n' + parsingError);
  } else {
    codeValidationResult = validateCode(instructions);
    console.log(codeValidationResult);
  }
}
