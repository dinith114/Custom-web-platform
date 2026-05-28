export function DividerBlock({ props }: { props: any }) {
  return <hr style={{ borderStyle: props.dividerStyle || "solid", borderColor: props.color || "#e5e7eb" }} className="my-4" />;
}
