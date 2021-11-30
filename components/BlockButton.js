import { useSlate } from "slate-react";
import CustomEditor from "../helpers/CustomEditor";

function BlockButton({ children }) {
  const editor = useSlate();
  const handleClick = (event) => {
    event.preventDefault();
    CustomEditor.toggleBlock(editor);
  };

  const isActive = CustomEditor.isBlockActive(editor);

  return (
    <div className={`button ${isActive ? "active" : ""}`} onClick={handleClick}>
      {children}
    </div>
  );
}

export default BlockButton;
