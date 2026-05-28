export function TextBlock({ props }: { props: any }) {
  return <p style={{ textAlign: props.align, ...props.style }}>{props.text || ""}</p>;
}
