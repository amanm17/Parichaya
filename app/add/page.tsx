import { AddMemberForm } from '@/components/AddMemberForm';
import { getPersons } from '@/lib/data';

export default async function AddPage() {
  const people = await getPersons();

  return (
    <main className="space-y-6 py-4">
      <section className="card p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Add or connect a member</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Start from any known person and grow the graph forward, backward, or sideways. Add parents, children,
          siblings, spouses, or honorary family members. Duplicate warnings help you connect existing people instead of recreating them.
        </p>
      </section>

      <AddMemberForm existingPeople={people} />
    </main>
  );
}
