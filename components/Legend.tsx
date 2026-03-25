const rows = [
  { label: 'Root', color: 'bg-root', text: 'Leads to Bark → Branch → Leaf' },
  { label: 'Bark', color: 'bg-bark', text: 'Leads to Branch → Leaf' },
  { label: 'Branch', color: 'bg-branch', text: 'Leads to Leaf' },
  { label: 'Leaf', color: 'bg-leaf', text: 'No children yet' },
  { label: 'Angel Bloom', color: 'bg-bloom', text: 'Untimely deceased, no further generation' },
  { label: 'Honorary', color: 'bg-accent', text: 'Emotionally family, not bloodline' }
];

export function Legend() {
  return (
    <div className="card p-5">
      <h3 className="text-base font-semibold text-slate-900">Tree Guide</h3>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <span className={`mt-1 inline-block h-3.5 w-3.5 rounded-full ${row.color}`} />
            <div>
              <p className="text-sm font-medium text-slate-900">{row.label}</p>
              <p className="text-xs text-slate-500">{row.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
