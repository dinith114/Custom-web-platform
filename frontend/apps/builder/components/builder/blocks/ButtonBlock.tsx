// ButtonBlock — clickable button with label, link, variant
export function ButtonBlock({ props }: { props: any }) {
  const variants: Record<string, string> = { primary: "bg-brand-600 text-white", secondary: "bg-gray-200 text-gray-800", ghost: "border border-gray-300 text-gray-700" };
  return <button className={`rounded-lg px-6 py-2 text-sm font-medium ${variants[props.variant || "primary"]}`} style={props.style}>{props.label || "Button"}</button>;
}
