import { UpdateFeed } from '@/components/UpdateFeed';
import { getPersons, getUpdates } from '@/lib/data';

export default async function UpdatesPage() {
  const [people, updates] = await Promise.all([getPersons(), getUpdates()]);

  return (
    <main className="space-y-6 py-4">
      <section className="card p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Recent Family Updates</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          This feed is designed for everyone. It tells the family who was added, which profiles were enriched,
          and how the graph is growing. Detailed log-style review can be layered in later, but the main feed stays welcoming.
        </p>
      </section>

      <UpdateFeed updates={updates} people={people} />
    </main>
  );
}
