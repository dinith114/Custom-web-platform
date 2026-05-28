// TextBlock — paragraph/rich text block
export function TextBlock({ props }: { props: any }) {
  return <p style={props.style} className="py-1 text-gray-700" data-align={props.align}>{props.text || "Enter text here..."}</p>;
}
