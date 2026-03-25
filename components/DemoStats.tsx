const stats = [
  { label: 'Sample members', value: '17' },
  { label: 'Distinct branches', value: '5' },
  { label: 'Relation loops', value: '2' },
  { label: 'Trace-ready examples', value: '6' }
];

export function DemoStats() {
  return (
    <div className="card p-6">
      <h2 className="section-title">Instantly testable</h2>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-3xl bg-moss/5 p-4">
            <div className="text-2xl font-semibold text-moss">{item.value}</div>
            <div className="mt-1 text-sm text-slate-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
