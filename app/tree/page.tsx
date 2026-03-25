import { Legend } from '@/components/Legend';
import { TreeCanvas } from '@/components/TreeCanvas';
import { getPersons, getRelationships } from '@/lib/data';

export default async function TreePage() {
  const [people, relationships] = await Promise.all([getPersons(), getRelationships()]);

  return (
    <main className="space-y-6 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Family Tree</h1>
          <p className="mt-1 text-sm text-slate-500">
            Explore the graph, inspect structural roles, and trace the most direct known relation between any two people.
          </p>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <TreeCanvas people={people} relationships={relationships} />
        <Legend />
      </div>
    </main>
  );
}
