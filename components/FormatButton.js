import { useSlate } from "slate-react";
import CustomEditor from "../helpers/CustomEditor";

function FormatButton({ format, children }) {
  const editor = useSlate();
  const handleClick = (event) => {
    event.preventDefault();
    CustomEditor.toggleMark(editor, format);
  };

  const isActive = CustomEditor.isMarkActive(editor, format);

  return (
    <div className={`button ${isActive ? "active" : ""}`} onClick={handleClick}>
      {children}
    </div>
  );
}

export default FormatButton;
