// HeadingBlock — H1-H6 editable heading
export function HeadingBlock({ props }: { props: any }) {
  const Tag = (props.level || "h2") as keyof JSX.IntrinsicElements;
  return <Tag style={props.style} className="py-2" data-align={props.align}>{props.text || "Heading"}</Tag>;
}
