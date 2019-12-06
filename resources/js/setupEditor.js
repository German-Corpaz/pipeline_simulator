export function setupEditor(){
    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/chaos");
    editor.session.setMode("ace/mode/assembly_x86");
    return editor;
}
