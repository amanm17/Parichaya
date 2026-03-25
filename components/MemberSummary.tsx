import Link from 'next/link';
import type { Person, Relationship } from '@/lib/types';
import { classifyPerson, badgeStyle } from '@/lib/classification';

export function MemberSummary({
  person,
  persons,
  relationships
}: {
  person: Person;
  persons: Person[];
  relationships: Relationship[];
}) {
  const classification = classifyPerson(person, persons, relationships);

  return (
    <section className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-moss">{person.name}</h1>
          {person.nickname ? <p className="mt-1 text-sm text-slate-500">Known as “{person.nickname}”</p> : null}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeStyle(classification)}`}>
          {classification.replace('_', ' ')}
        </span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-moss/5 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Gender</div>
          <div className="mt-1 text-sm text-slate-700">{person.gender ?? 'Not set'}</div>
        </div>
        <div className="rounded-3xl bg-moss/5 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Years</div>
          <div className="mt-1 text-sm text-slate-700">
            {person.birth_year ?? 'Unknown'}
            {person.is_deceased ? ` – ${person.death_year ?? 'Unknown'}` : ' – living'}
          </div>
        </div>
        <div className="rounded-3xl bg-moss/5 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Special marker</div>
          <div className="mt-1 text-sm text-slate-700">{person.honorary ? 'Honorary / exception family' : 'None'}</div>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-700">{person.description || 'This member is ready for more details and memories.'}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/tree" className="rounded-full bg-moss px-4 py-2 text-sm font-medium text-white">
          View in tree
        </Link>
        <Link href="/updates" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
          View updates
        </Link>
      </div>
    </section>
  );
}
