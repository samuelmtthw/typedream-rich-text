import { Editor, Element, Transforms } from "slate";

const CustomEditor = {
  isMarkActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n[format] === true,
      universal: true,
    });
    return !!match;
  },

  isBlockActive(editor) {
    const { selection } = editor;
    if (!selection) {
      return false;
    }

    const [match] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        // !Editor.isEditor(n) &&
        // Element.isElement(n) &&
        n.type === "code",
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

  toggleBlock(editor) {
    const isActive = CustomEditor.isBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

export default CustomEditor;
