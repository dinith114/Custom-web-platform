// VideoBlock — embedded video with URL and controls
export function VideoBlock({ props }: { props: any }) {
  return props.src ? (
    <video src={props.src} controls={props.controls !== false} autoPlay={props.autoPlay} muted={props.muted} className="w-full rounded" />
  ) : (
    <div className="flex h-48 items-center justify-center rounded bg-gray-100 text-gray-400">🎥 Add a video URL</div>
  );
}
