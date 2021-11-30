export default function DefaultElement(props) {
  if (props.element.type === "heading") {
    return <h2 {...props.attributes}>{props.children}</h2>;
  } else {
    return <p {...props.attributes}>{props.children}</p>;
  }
}
