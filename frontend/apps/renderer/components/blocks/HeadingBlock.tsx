// Read-only block components for the public renderer
export function HeadingBlock({ props }: { props: any }) {
  const Tag = (props.level || "h2") as keyof JSX.IntrinsicElements;
  return <Tag style={{ textAlign: props.align, color: props.color, ...props.style }}>{props.text || ""}</Tag>;
}
