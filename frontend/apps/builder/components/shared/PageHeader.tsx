// PageHeader — reusable page header with title + optional action button

interface PageHeaderProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {action && (
        <button onClick={action.onClick} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors">
          {action.label}
        </button>
      )}
    </div>
  );
}
