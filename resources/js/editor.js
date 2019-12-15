import { blankLine } from './utils/codeUtils.js';
const EDITOR_ID = 'editor';
let marker = null;

export function setupListener() {
  let editor = ace.edit(EDITOR_ID);
  editor.getSession().on('change', function() {
    clearMarker();
  });
}
export function setupEditor() {
  let editor = ace.edit(EDITOR_ID);
  editor.setTheme('ace/theme/chaos');
  editor.session.setMode('ace/mode/assembly_x86');
  editor.setOption('firstLineNumber', 0);
}

export function getEditorCode() {
  let editor = ace.edit(EDITOR_ID);
  return editor.getValue().toUpperCase();
}

export function highlightLine(index) {
  let Range = ace.require('ace/range').Range;
  let editor = ace.edit(EDITOR_ID);
  let code = getEditorCode();
  let codeLines = code.split('\n');
  let lineToHighlight = 0;
  let counter = 0;
  while (counter <= index) {
    if (!blankLine(codeLines[lineToHighlight])) {
      counter++;
    }
    lineToHighlight++;
  }
  lineToHighlight--;
  marker = editor.session.addMarker(
    new Range(lineToHighlight, 0, lineToHighlight, 1),
    'error',
    'fullLine'
  );
}

export function clearMarker() {
  let editor = ace.edit(EDITOR_ID);
  if (marker) {
    editor.getSession().removeMarker(marker);
    marker = null;
  }
}
