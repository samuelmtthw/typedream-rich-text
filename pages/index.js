import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import DefaultElement from "../components/DefaultElement";
import Leaf from "../components/Leaf";
import CustomEditor from "../helpers/CustomEditor";
import Head from "next/head";

export default function Home() {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: "This is a rich-text area. Try to type something in here. \n\nYou can format the words using Ctrl or Command (Mac). Select the words that you want to format, and type the shortcut (Command + B for bold text).",
        },
      ],
    },
  ]);

  const renderElement = useCallback((props) => <DefaultElement {...props} />);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  });

  return (
    <>
      <Head>
        <title>Rich Text Area</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <div className="page">
        <h1>Dreamy Editor</h1>
        <div className="card">
          <div className="buttons">
            <div className="button active">
              <strong>B</strong>
            </div>
            <div className="button ">
              <i>I</i>
            </div>
            <div className="button ">
              <u>U</u>
            </div>
          </div>
          <Slate
            editor={editor}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          >
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder={"Type something over here..."}
              onKeyDown={(event) => {
                if (!event.ctrlKey && !event.metaKey) {
                  return;
                }

                switch (event.key) {
                  case "b": {
                    event.preventDefault();
                    CustomEditor.toggleMark(editor, "bold");
                    break;
                  }

                  case "i": {
                    event.preventDefault();
                    CustomEditor.toggleMark(editor, "italic");
                    break;
                  }

                  case "u": {
                    event.preventDefault();
                    CustomEditor.toggleMark(editor, "underline");
                    break;
                  }
                }
              }}
            />
          </Slate>
        </div>
      </div>
    </>
  );
}
