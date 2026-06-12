export function VideoBlock({ props }: { props: any }) {
  if (!props.src) return null;
  return <video src={props.src} controls={props.controls !== false} autoPlay={props.autoPlay} muted={props.muted} className="w-full rounded" />;
}
