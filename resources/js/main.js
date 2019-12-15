import * as editor from './editor.js';
import { getCodeLines } from './utils/codeUtils.js';
import { validateCode } from './codeValidator.js';
import Instruction from './Instruction.js';
import * as pipeline from './pipelineGenerator.js';
import { drawChart, drawCPIChart } from './chartGenerator.js';
import { NoPipeline } from './schedulers/NoPipeline.js';
import { NoForwardingPipeline } from './schedulers/NoForwardingPipeline.js';

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
  console.log('--------Set of instructions-----------');
  console.log(instructions);
  console.log('--------------------------------------');
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
    let codeValidationResult = validateCode(instructions);

    if (codeValidationResult.error) {
      /* TODO show runtime error in console */
      console.log('Runtime Error ' + codeValidationResult.error);
      editor.highlightLine(codeValidationResult.executedInstructions.pop().index);
    } else {
      console.log('--------Code execution -----------');
      console.log(codeValidationResult);
      console.log('--------------------------------------');
      codeValidationResult.instructions = instructions;
      let noPipeScheduling = new NoPipeline(codeValidationResult);
      let basicPipeScheduling = new NoForwardingPipeline(codeValidationResult);
      //let basicPipeline = pipeline.forwardingPipeline(codeValidationResult);
      console.log('--------Pipeline -----------');
      console.log(basicPipeScheduling);
      console.log('--------------------------------------');
      drawChart(basicPipeScheduling);
      //drawCPIChart(noPipeline, basicPipeline);
    }
  }
}
