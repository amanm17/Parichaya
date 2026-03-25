import Link from 'next/link';
import { notFound } from 'next/navigation';
import { classifyOverlay, classifyRole } from '@/lib/classification';
import { getPersonById, getPersons, getRelationships } from '@/lib/data';

export default async function MemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [person, people, relationships] = await Promise.all([
    getPersonById(id),
    getPersons(),
    getRelationships(),
  ]);

  if (!person) notFound();

  const role = classifyRole(person.id, relationships);
  const overlay = classifyOverlay(person, relationships);
  const connected = relationships.filter(
    (edge) => edge.from_person === person.id || edge.to_person === person.id
  );
  const peopleById = new Map(people.map((item) => [item.id, item]));

  return (
    <main className="space-y-6 py-4">
      <section className="card p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-root/10 text-root">{role}</span>
              {overlay && (
                <span className="badge bg-accent/10 text-accent">
                  {overlay.replace('_', ' ')}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              {person.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {person.nickname || 'No nickname added yet'}
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              {person.description ||
                'This profile can be enriched with more details, photos, and story snippets.'}
            </p>
          </div>
          <div className="grid gap-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 sm:grid-cols-2 lg:min-w-[320px]">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Gender</p>
              <p className="mt-1 font-medium text-slate-900">
                {person.gender ?? 'unspecified'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Birth year</p>
              <p className="mt-1 font-medium text-slate-900">{person.birth_year ?? '—'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Life status</p>
              <p className="mt-1 font-medium text-slate-900">
                {person.is_deceased ? 'Deceased' : 'Living'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Death year</p>
              <p className="mt-1 font-medium text-slate-900">{person.death_year ?? '—'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Connected relationships</h2>
          <div className="mt-4 space-y-3">
            {connected.map((edge) => {
              const otherId =
                edge.from_person === person.id ? edge.to_person : edge.from_person;
              const other = peopleById.get(otherId);

              return (
                <div
                  key={edge.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                >
                  <span className="font-medium text-slate-900">
                    {edge.relation_type.replace('_', ' ')}
                  </span>{' '}
                  with{' '}
                  {other ? (
                    <Link href={`/member/${other.id}`} className="font-medium text-root">
                      {other.name}
                    </Link>
                  ) : (
                    'Unknown member'
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tree" className="btn-primary">
              Open in tree
            </Link>
            <Link href="/updates" className="btn-secondary">
              View updates
            </Link>
            <Link href="/add" className="btn-secondary">
              Add related member
            </Link>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Later versions can add profile galleries, event memories, edit history, and
            multiple contextual kinship labels.
          </p>
        </div>
      </section>
    </main>
  );
}