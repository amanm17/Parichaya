import Link from 'next/link';
import { Person, Relationship } from '@/lib/types';
import { classifyOverlay, classifyRole } from '@/lib/classification';

export function MemberCard({ person, relationships }: { person: Person; relationships: Relationship[] }) {
  const role = classifyRole(person.id, relationships);
  const overlay = classifyOverlay(person, relationships);

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{person.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{person.nickname || 'No nickname added yet'}</p>
        </div>
        <div className="flex gap-2">
          <span className="badge bg-root/10 text-root">{role}</span>
          {overlay && <span className="badge bg-accent/10 text-accent">{overlay.replace('_', ' ')}</span>}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{person.description || 'Profile details are still being built out.'}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
        <span>Gender: {person.gender ?? 'unspecified'}</span>
        <span>Born: {person.birth_year ?? '—'}</span>
        <span>{person.is_deceased ? `Died: ${person.death_year ?? '—'}` : 'Living'}</span>
      </div>
      <div className="mt-5">
        <Link href={`/member/${person.id}`} className="btn-secondary">Open Profile</Link>
      </div>
    </div>
  );
}
