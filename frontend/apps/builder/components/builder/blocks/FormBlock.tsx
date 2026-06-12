// FormBlock — contact/inquiry form builder placeholder
export function FormBlock({ props }: { props: any }) {
  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h3 className="mb-4 text-lg font-medium">Contact Form</h3>
      <div className="space-y-3">
        <input placeholder="Name" className="w-full rounded border border-gray-300 px-3 py-2 text-sm" disabled />
        <input placeholder="Email" className="w-full rounded border border-gray-300 px-3 py-2 text-sm" disabled />
        <textarea placeholder="Message" rows={3} className="w-full rounded border border-gray-300 px-3 py-2 text-sm" disabled />
        <button className="rounded bg-brand-600 px-4 py-2 text-sm text-white" disabled>{props.submitLabel || "Submit"}</button>
      </div>
    </div>
  );
}
