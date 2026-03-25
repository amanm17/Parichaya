'use client';

import { useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { Person, Relationship } from '@/lib/types';
import { classifyOverlay, classifyRole, colorForRole } from '@/lib/classification';
import { buildTraceResult } from '@/lib/trace';

type Props = {
  people: Person[];
  relationships: Relationship[];
};

function makeLayout(people: Person[]) {
  return people.reduce<Record<string, { x: number; y: number }>>((acc, person, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    acc[person.id] = { x: col * 260, y: row * 150 };
    return acc;
  }, {});
}

export function TreeCanvas({ people, relationships }: Props) {
  const [selectedIds, setSelectedIds] = useState<{ source: string; target: string }>({ source: '', target: '' });
  const layout = useMemo(() => makeLayout(people), [people]);

  const trace = useMemo(() => {
    if (!selectedIds.source || !selectedIds.target) return null;
    return buildTraceResult(selectedIds.source, selectedIds.target, people, relationships);
  }, [selectedIds, people, relationships]);

  const highlightedPairs = new Set<string>();
  if (trace) {
    for (let i = 0; i < trace.primaryPath.length - 1; i++) {
      highlightedPairs.add(`${trace.primaryPath[i]}-${trace.primaryPath[i + 1]}`);
      highlightedPairs.add(`${trace.primaryPath[i + 1]}-${trace.primaryPath[i]}`);
    }
  }

  const nodes: Node[] = people.map((person) => {
    const role = classifyRole(person.id, relationships);
    const overlay = classifyOverlay(person, relationships);
    const color = colorForRole(role, overlay);

    return {
      id: person.id,
      position: layout[person.id],
      data: {
        label: `${person.name}${person.nickname ? ` (${person.nickname})` : ''}`
      },
      style: {
        background: color,
        color: role === 'ROOT' || role === 'BARK' ? '#fff' : '#1f2937',
        borderRadius: 18,
        border: overlay === 'HONORARY' ? '2px dashed #9a3412' : '1px solid rgba(15,23,42,0.08)',
        padding: 12,
        minWidth: 160,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
      }
    };
  });

  const edges: Edge[] = relationships.map((relationship) => {
    const isHighlighted = highlightedPairs.has(`${relationship.from_person}-${relationship.to_person}`);
    const neutral = relationship.relation_type === 'spouse' || relationship.relation_type === 'partner';

    return {
      id: relationship.id,
      source: relationship.from_person,
      target: relationship.to_person,
      label: relationship.relation_type.replace('_', ' '),
      type: 'smoothstep',
      animated: isHighlighted,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: {
        stroke: isHighlighted ? '#c86d4b' : neutral ? '#9ca3af' : '#5b7d50',
        strokeWidth: isHighlighted ? 3 : 2,
        strokeDasharray: relationship.relation_type === 'honorary' ? '6 4' : undefined
      },
      labelStyle: {
        fill: '#475569',
        fontSize: 11
      }
    };
  });

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="card h-[72vh] overflow-hidden p-2">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
          <MiniMap pannable zoomable />
          <Controls />
        </ReactFlow>
      </div>

      <aside className="space-y-4">
        <div className="card p-5">
          <h3 className="text-base font-semibold text-slate-900">Trace Relation</h3>
          <p className="mt-1 text-sm text-slate-500">
            Select any two people to highlight the shortest known path and explain the connection.
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="label">Person A</label>
              <select className="field" value={selectedIds.source} onChange={(e) => setSelectedIds((prev) => ({ ...prev, source: e.target.value }))}>
                <option value="">Select</option>
                {people.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Person B</label>
              <select className="field" value={selectedIds.target} onChange={(e) => setSelectedIds((prev) => ({ ...prev, target: e.target.value }))}>
                <option value="">Select</option>
                {people.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-base font-semibold text-slate-900">Trace Result</h3>
          {!trace ? (
            <p className="mt-3 text-sm leading-6 text-slate-500">Pick two people to see the most direct path and the explicit relationship chain.</p>
          ) : (
            <div className="mt-3 space-y-3 text-sm text-slate-600">
              <div>
                <p className="font-medium text-slate-900">Most direct trace</p>
                <p>{trace.pathLabels.join(' → ')}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Explicit relation</p>
                <p>{trace.explanation}</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">Side</p>
                <p>{trace.side}</p>
              </div>
              <p className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-500">
                Close alternate traces can be surfaced in later iterations. This MVP highlights the most direct known path.
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
