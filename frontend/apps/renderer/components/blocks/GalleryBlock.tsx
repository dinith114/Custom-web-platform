export function GalleryBlock({ props }: { props: any }) {
  const images = props.images || [];
  if (images.length === 0) return null;
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, 1fr)` }}>
      {images.map((img: any, i: number) => <img key={i} src={img.src} alt={img.alt || ""} className="rounded object-cover" />)}
    </div>
  );
}
