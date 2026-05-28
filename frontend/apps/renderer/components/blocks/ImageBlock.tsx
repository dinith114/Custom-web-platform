export function ImageBlock({ props }: { props: any }) {
  if (!props.src) return null;
  return <img src={props.src} alt={props.alt || ""} style={{ objectFit: props.objectFit || "cover", width: "100%", ...props.style }} />;
}
