const items = [
  {
    title: 'Interactive family graph',
    description: 'Zoom, pan, search, isolate branches, show spouse-side branches, and inspect loops without duplicating people.'
  },
  {
    title: 'Trace Relation',
    description: 'Pick any two people and highlight the shortest known path, then explain it in explicit, Indian kinship-aware language.'
  },
  {
    title: 'Friendly updates feed',
    description: 'See who was added, which profiles were enriched, and how the family graph is growing in a warm, visitor-friendly view.'
  },
  {
    title: 'Profile-first storytelling',
    description: 'Each member gets a visitable profile with gallery, basic details, tree context, and multi-path relation summaries.'
  }
];

export function FeatureGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
