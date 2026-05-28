// DividerBlock — horizontal separator line
export function DividerBlock({ props }: { props: any }) {
  return <hr style={{ borderStyle: props.dividerStyle || "solid", borderColor: props.color || "#e5e7eb", ...props.style }} className="my-4" />;
}
