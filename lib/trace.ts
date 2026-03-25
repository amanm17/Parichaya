import { Person, Relationship } from '@/lib/types';

export type TraceResult = {
  primaryPath: string[];
  alternates: string[][];
  explanation: string;
  pathLabels: string[];
  side: string;
};

function neighbors(id: string, relationships: Relationship[]) {
  return relationships
    .filter((edge) => edge.from_person === id || edge.to_person === id)
    .map((edge) => ({
      personId: edge.from_person === id ? edge.to_person : edge.from_person,
      relationType: edge.relation_type,
      reversed: edge.to_person === id
    }));
}

function edgeWeight(type: Relationship['relation_type']) {
  switch (type) {
    case 'parent':
    case 'child':
      return 1;
    case 'sibling':
      return 1.15;
    case 'spouse':
    case 'partner':
      return 1.25;
    case 'honorary':
      return 2.2;
    default:
      return 1.6;
  }
}

export function findShortestPath(start: string, end: string, relationships: Relationship[]) {
  const distances = new Map<string, number>([[start, 0]]);
  const previous = new Map<string, { node: string; relationType: Relationship['relation_type']; reversed: boolean }>();
  const queue = new Set<string>([start]);

  while (queue.size > 0) {
    const current = [...queue].sort((a, b) => (distances.get(a)! - distances.get(b)!))[0];
    queue.delete(current);

    if (current === end) break;

    for (const next of neighbors(current, relationships)) {
      const candidate = (distances.get(current) ?? Infinity) + edgeWeight(next.relationType);
      if (candidate < (distances.get(next.personId) ?? Infinity)) {
        distances.set(next.personId, candidate);
        previous.set(next.personId, { node: current, relationType: next.relationType, reversed: next.reversed });
        queue.add(next.personId);
      }
    }
  }

  if (!previous.has(end) && start !== end) return null;

  const path: string[] = [end];
  const edges: { relationType: Relationship['relation_type']; reversed: boolean }[] = [];
  let cursor = end;

  while (cursor !== start) {
    const prev = previous.get(cursor);
    if (!prev) break;
    edges.unshift({ relationType: prev.relationType, reversed: prev.reversed });
    path.unshift(prev.node);
    cursor = prev.node;
  }

  return { path, edges, distance: distances.get(end) ?? 0 };
}

function humanizeStep(relationType: Relationship['relation_type'], reversed: boolean) {
  if (relationType === 'parent') return reversed ? 'child' : 'parent';
  if (relationType === 'spouse') return 'spouse';
  if (relationType === 'partner') return 'partner';
  if (relationType === 'sibling') return 'sibling';
  if (relationType === 'honorary') return 'honorary connection';
  return relationType.replace('_', ' ');
}

export function buildTraceResult(start: string, end: string, people: Person[], relationships: Relationship[]): TraceResult | null {
  const result = findShortestPath(start, end, relationships);
  if (!result) return null;

  const byId = new Map(people.map((p) => [p.id, p]));
  const pathLabels = result.path.map((id) => byId.get(id)?.name ?? id);
  const descriptors = result.edges.map((edge) => humanizeStep(edge.relationType, edge.reversed));

  const explanation = descriptors.length === 0
    ? `${pathLabels[0]} is the same person.`
    : `${pathLabels[0]} → ${descriptors.join(' → ')} → ${pathLabels[pathLabels.length - 1]}`;

  const side = descriptors.some((d) => d === 'spouse' || d === 'partner')
    ? 'Mixed · By marriage'
    : 'Direct bloodline or close structural path';

  return {
    primaryPath: result.path,
    alternates: [],
    explanation,
    pathLabels,
    side
  };
}
