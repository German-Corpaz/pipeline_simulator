import {setupEditor} from "./setupEditor.js"
import * as utilities from "./utilities.js"
import Instruction from "./Instruction.js"
const editor=setupEditor();

setupListeners();





function setupListeners(){
  $(".primary").click(mainCode);
}
function mainCode() {
  let editorCode=editor.getValue().toUpperCase();
  let codeLines=utilities.splitInLines(editorCode);

  for (let i = 0; i < codeLines.length; i++) {
    let line = codeLines[i];
    if (!utilities.blankLine(line)) {
      let newInstruction=new Instruction(line);
    }
  }
}

