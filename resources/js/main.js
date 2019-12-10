import { setupEditor } from './setupEditor.js';
import { validateCode } from './codeValidator.js';
import * as utilities from './utilities.js';
import Instruction from './Instruction.js';
import * as pipeline from './pipelineGenerator.js';
import { drawChart } from './chartGenerator.js';

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
  let index = 0;
  let codeValidationResult;

  for (i = 0; i < codeLines.length; i++) {
    let line = codeLines[i];
    if (!utilities.blankLine(line)) {
      let newInstruction = new Instruction(line, index);
      index++;
      if (newInstruction.error) {
        parsingError = newInstruction.error;
        break;
      } else {
        instructions.push(newInstruction);
      }
    }
  }

  if (parsingError) {
    /* TODO show parsing error in console */
    i++;
    console.log('Parsing ERROR on line ' + i + '\n' + parsingError);
  } else {
    codeValidationResult = validateCode(instructions);
    if (codeValidationResult.errorMessage) {
      /* TODO show runtime error in console */
      console.log(codeValidationResult.errorMessage);
    } else {
      codeValidationResult.instructions = instructions;
      let pipelineResult = pipeline.getMatrixNotForwardingPipelining(codeValidationResult);
      drawChart(pipelineResult);
    }
  }
}
