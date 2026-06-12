// HeroBlock — hero section with background image, overlay, CTA
export function HeroBlock({ props }: { props: any }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-lg" style={{ minHeight: props.minHeight || "400px", backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0" style={{ backgroundColor: props.overlay || "rgba(0,0,0,0.4)" }} />
      <div className="relative z-10 text-center text-white"><h2 className="text-3xl font-bold">Hero Section</h2></div>
    </div>
  );
}
