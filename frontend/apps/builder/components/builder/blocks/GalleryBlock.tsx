// GalleryBlock — multi-image grid
export function GalleryBlock({ props }: { props: any }) {
  const images = props.images || [];
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${props.columns || 3}, 1fr)`, gap: props.gap || "16px" }}>
      {images.length === 0 ? <div className="col-span-full py-8 text-center text-gray-400">Add images to gallery</div> : images.map((img: any, i: number) => <img key={i} src={img.src} alt={img.alt || ""} className="rounded object-cover" />)}
    </div>
  );
}
