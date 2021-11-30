import { Editor, Text, Transforms } from "slate";

const CustomEditor = {
  isMarkActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[format] === true,
      universal: true,
    });
    return !!match;
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
};

export default CustomEditor;
