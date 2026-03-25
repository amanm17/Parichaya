'use client';

import { traceRelation } from '@/lib/trace';
import type { Person, Relationship } from '@/lib/types';

export function TracePanel({
  persons,
  relationships,
  traceFrom,
  traceTo,
  personMap
}: {
  persons: Person[];
  relationships: Relationship[];
  traceFrom: string;
  traceTo: string;
  personMap: Record<string, Person>;
}) {
  const result = traceFrom && traceTo ? traceRelation(traceFrom, traceTo, persons, relationships) : null;

  return (
    <aside className="card p-5">
      <h2 className="section-title">Trace relation</h2>
      <p className="mt-2 muted">
        Select two people to surface the most direct known connection. If another close route exists, it is shown underneath.
      </p>

      {!traceFrom || !traceTo ? (
        <div className="mt-6 rounded-3xl bg-moss/5 p-4 text-sm leading-7 text-slate-600">
          Pick two people from the tree toolbar to begin tracing.
        </div>
      ) : null}

      {result?.primaryPath ? (
        <div className="mt-6 space-y-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Most direct trace</div>
            <div className="mt-2 rounded-3xl bg-white p-4 text-sm leading-7 text-slate-700 shadow-soft">
              {result.primaryPath.map((id, index) => (
                <span key={id}>
                  {personMap[id]?.name ?? id}
                  {index < result.primaryPath!.length - 1 ? ' → ' : ''}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-3xl bg-moss/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Explicit relation chain</div>
              <div className="mt-2 text-sm leading-7 text-slate-700">{result.explanation}</div>
            </div>
            <div className="rounded-3xl bg-terracotta/10 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Path type</div>
              <div className="mt-2 text-sm leading-7 text-slate-700">{result.side}</div>
            </div>
          </div>

          {result.alternatePaths.length ? (
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Other close trace{result.alternatePaths.length > 1 ? 's' : ''}</div>
              <div className="mt-2 space-y-2">
                {result.alternatePaths.map((path, index) => (
                  <div key={index} className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700">
                    {path.map((id, i) => (
                      <span key={id + i}>
                        {personMap[id]?.name ?? id}
                        {i < path.length - 1 ? ' → ' : ''}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : result ? (
        <div className="mt-6 rounded-3xl bg-white p-4 text-sm leading-7 text-slate-700 shadow-soft">
          {result.explanation}
        </div>
      ) : null}
    </aside>
  );
}
