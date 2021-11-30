import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import CodeElement from "../components/CodeElement";
import DefaultElement from "../components/DefaultElement";
import styles from "../styles/Home.module.css";

export default function Home() {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  });

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            case "`": {
              event.preventDefault();

              const [match] = Editor.nodes(editor, {
                match: (n) => n.type === "code",
              });

              Transforms.setNodes(
                editor,
                { type: match ? "paragraph" : "code" },
                { match: (n) => Editor.isBlock(editor, n) }
              );

              break;
            }

            case "b": {
              event.preventDefault();

              Transform.setNodes(
                editor,
                { bold: true },
                {
                  match: (n) => {
                    Text.isText(n);
                  },
                  split: true,
                }
              );
              break;
            }
          }
        }}
      />
    </Slate>
  );
}
