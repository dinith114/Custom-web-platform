// ImageBlock — image with src, alt, and style controls
export function ImageBlock({ props }: { props: any }) {
  return props.src ? (
    <img src={props.src} alt={props.alt || ""} style={{ objectFit: props.objectFit || "cover", width: "100%", ...props.style }} className="rounded" />
  ) : (
    <div className="flex h-48 items-center justify-center rounded bg-gray-100 text-gray-400">🖼️ Select an image</div>
  );
}
