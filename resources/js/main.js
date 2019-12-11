import * as editor from './editor.js';
import * as codeUtils from './utils/codeUtils.js';
import { validateCode } from './codeValidator.js';
import * as utilities from './utilities.js';
import Instruction from './Instruction.js';
import * as pipeline from './pipelineGenerator.js';
import { drawChart } from './chartGenerator.js';

editor.setupEditor();

setupListeners();

function setupListeners() {
  $('.primary').click(mainCode);
}
function mainCode() {
  const code = editor.getEditorCode();
  const codeLines = codeUtils.splitInLines(code);
  let instructions = [];
  let parsingError;
  let i = 0;
  let instructionIndex = 0;
  let codeValidationResult;

  for (i = 0; i < codeLines.length; i++) {
    let line = codeLines[i];
    if (!codeUtils.blankLine(line)) {
      let newInstruction = new Instruction(line, instructionIndex);
      instructionIndex++;
      if (newInstruction.error) {
        parsingError = newInstruction.error;
        break;
      } else {
        instructions.push(newInstruction);
      }
    }
  }
  console.log(instructions);

  if (parsingError) {
    /* TODO show parsing error in console */
    i++;
    console.log('Parsing ERROR on line ' + i + '\n' + parsingError);
  } else {
    let codeValidationResult = validateCode(instructions);
    console.log(codeValidationResult);
  }
  //   if (codeValidationResult.errorMessage) {
  //     /* TODO show runtime error in console */
  //     console.log(codeValidationResult.errorMessage);
  //   } else {
  //     codeValidationResult.instructions = instructions;
  //     let pipelineResult = pipeline.getMatrixWithoutPipelining(codeValidationResult);
  //     drawChart(pipelineResult);
  //   }
  // }
}
