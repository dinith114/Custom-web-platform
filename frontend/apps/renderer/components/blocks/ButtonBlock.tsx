export function ButtonBlock({ props }: { props: any }) {
  return <a href={props.href || "#"} className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700" style={props.style}>{props.label || "Button"}</a>;
}
