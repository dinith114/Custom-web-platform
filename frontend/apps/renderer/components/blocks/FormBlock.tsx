export function FormBlock({ props }: { props: any }) {
  return (
    <form className="space-y-3 rounded-lg border p-6">
      <input placeholder="Name" className="w-full rounded border px-3 py-2 text-sm" />
      <input placeholder="Email" type="email" className="w-full rounded border px-3 py-2 text-sm" />
      <textarea placeholder="Message" rows={3} className="w-full rounded border px-3 py-2 text-sm" />
      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm text-white">{props.submitLabel || "Submit"}</button>
    </form>
  );
}
