import * as editor from './editor.js';
import { getCodeLines } from './utils/codeUtils.js';
import { validateCode } from './codeValidator.js';
import Instruction from './Instruction.js';
import * as pipeline from './pipelineGenerator.js';
import { drawChart } from './chartGenerator.js';

editor.setupEditor();

setupListeners();

function setupListeners() {
  $('.primary').click(mainCode);
  editor.setupListener();
}
function mainCode() {
  const code = editor.getEditorCode();
  const codeLines = getCodeLines(code);

  let instructions = [];
  let parsingError;
  let i = 0;
  for (i = 0; i < codeLines.length; i++) {
    let newInstruction = new Instruction(codeLines[i], i);
    instructions.push(newInstruction);
    if (newInstruction.error) {
      parsingError = newInstruction.error;
      break;
    }
  }
  console.log(instructions);
  if (parsingError) {
    /* TODO show parsing error in console */
    editor.highlightLine(i);
    console.log(
      'Parsing ERROR on instruction ' +
        i +
        ': ' +
        instructions[i].fullInstruction +
        '\n' +
        parsingError
    );
  } else {
    // let codeValidationResult = validateCode(instructions);
    // if (codeValidationResult.errorMessage) {
    //   /* TODO show runtime error in console */
    //   console.log(codeValidationResult.errorMessage);
    // }
  }
  //else {
  //       codeValidationResult.instructions = instructions;
  //       console.log(codeValidationResult);
  //       let pipelineResult = pipeline.basicPipeline(codeValidationResult);
  //       drawChart(pipelineResult);
  //     }
  //   }
}
