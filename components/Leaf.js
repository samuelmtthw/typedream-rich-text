function Leaf({ attributes, leaf, children }) {
  let style = {};

  if (leaf.bold) {
    style.fontWeight = "bold";
  } else {
    style.fontWeight = "normal";
  }

  if (leaf.italic) {
    style.fontStyle = "italic";
  } else {
    style.fontStyle = "normal";
  }

  if (leaf.underline) {
    style.textDecoration = "underline";
  } else {
    style.textDecoration = "none";
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
}

export default Leaf;
