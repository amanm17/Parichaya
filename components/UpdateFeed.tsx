import Link from 'next/link';
import { Person, UpdateItem } from '@/lib/types';

export function UpdateFeed({ updates, people }: { updates: UpdateItem[]; people: Person[] }) {
  const byId = new Map(people.map((person) => [person.id, person]));

  return (
    <div className="space-y-4">
      {updates.map((update) => {
        const person = update.person_id ? byId.get(update.person_id) : null;
        return (
          <article key={update.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-root/70">{update.type.replace('_', ' ')}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{update.message}</h3>
                {person && (
                  <p className="mt-2 text-sm text-slate-500">
                    Related member: <Link className="font-medium text-root" href={`/member/${person.id}`}>{person.name}</Link>
                  </p>
                )}
              </div>
              <time className="text-xs text-slate-400">{update.created_at ? new Date(update.created_at).toLocaleDateString() : 'Recent'}</time>
            </div>
          </article>
        );
      })}
    </div>
  );
}
