const EDITOR_ID = 'editor';

export function setupEditor() {
  let editor = ace.edit(EDITOR_ID);
  editor.setTheme('ace/theme/chaos');
  editor.session.setMode('ace/mode/assembly_x86');
}

export function getEditorCode() {
  let editor = ace.edit(EDITOR_ID);
  return editor.getValue().toUpperCase();
}
