import type { Person, Relationship } from '@/lib/types';

export type TraceResult = {
  primaryPath: string[];
  alternatePaths: string[][];
  explanation: string;
  pathType: string;
  side: string;
  pathLabels: string[];
};

function neighborsOf(personId: string, relationships: Relationship[]) {
  const neighbors: string[] = [];

  for (const rel of relationships) {
    if (rel.from_person === personId) neighbors.push(rel.to_person);
    if (rel.to_person === personId) neighbors.push(rel.from_person);
  }

  return [...new Set(neighbors)];
}

function bfsShortestPath(
  startId: string,
  endId: string,
  relationships: Relationship[]
): string[] | null {
  if (startId === endId) return [startId];

  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    for (const neighbor of neighborsOf(current, relationships)) {
      if (visited.has(neighbor)) continue;

      const nextPath = [...path, neighbor];
      if (neighbor === endId) return nextPath;

      visited.add(neighbor);
      queue.push(nextPath);
    }
  }

  return null;
}

function bfsAlternatePaths(
  startId: string,
  endId: string,
  relationships: Relationship[],
  maxExtraSteps = 1,
  maxAlternates = 3
): string[][] {
  const shortest = bfsShortestPath(startId, endId, relationships);
  if (!shortest) return [];

  const targetLength = shortest.length + maxExtraSteps;
  const queue: string[][] = [[startId]];
  const results: string[][] = [];

  while (queue.length > 0 && results.length < maxAlternates) {
    const path = queue.shift()!;
    const current = path[path.length - 1];

    if (path.length > targetLength) continue;

    for (const neighbor of neighborsOf(current, relationships)) {
      if (path.includes(neighbor)) continue;

      const nextPath = [...path, neighbor];

      if (neighbor === endId) {
        if (
          nextPath.length >= shortest.length &&
          nextPath.length <= targetLength &&
          nextPath.join('|') !== shortest.join('|')
        ) {
          results.push(nextPath);
        }
        continue;
      }

      queue.push(nextPath);
    }
  }

  return results;
}

function findPersonName(id: string, persons: Person[]) {
  return persons.find((p) => p.id === id)?.name ?? 'Unknown member';
}

function relationBetween(a: string, b: string, relationships: Relationship[]) {
  const rel = relationships.find(
    (r) =>
      (r.from_person === a && r.to_person === b) ||
      (r.from_person === b && r.to_person === a)
  );

  return rel?.relation_type ?? 'connected to';
}

function humanizeRelationType(type: string) {
  switch (type) {
    case 'parent':
      return 'parent/child';
    case 'spouse':
      return 'spouse';
    case 'sibling':
      return 'sibling';
    case 'honorary':
      return 'honorary family connection';
    default:
      return type;
  }
}

function inferPathType(path: string[], relationships: Relationship[]) {
  let hasSpouse = false;
  let hasHonorary = false;

  for (let i = 0; i < path.length - 1; i++) {
    const rel = relationBetween(path[i], path[i + 1], relationships);
    if (rel === 'spouse') hasSpouse = true;
    if (rel === 'honorary') hasHonorary = true;
  }

  if (hasHonorary) return 'Honorary / exceptional connection';
  if (hasSpouse) return 'By marriage / mixed family path';
  return 'Direct family path';
}

function inferSide(path: string[], relationships: Relationship[]) {
  let hasSpouse = false;
  let hasHonorary = false;

  for (let i = 0; i < path.length - 1; i++) {
    const rel = relationBetween(path[i], path[i + 1], relationships);
    if (rel === 'spouse') hasSpouse = true;
    if (rel === 'honorary') hasHonorary = true;
  }

  if (hasHonorary) return 'Honorary';
  if (hasSpouse) return 'By marriage';
  return 'Direct / lineage side';
}

function buildExplanation(
  path: string[],
  persons: Person[],
  relationships: Relationship[]
) {
  if (path.length === 1) {
    return `${findPersonName(path[0], persons)} is the same person selected at both ends.`;
  }

  const parts: string[] = [];

  for (let i = 0; i < path.length - 1; i++) {
    const fromName = findPersonName(path[i], persons);
    const toName = findPersonName(path[i + 1], persons);
    const rel = humanizeRelationType(relationBetween(path[i], path[i + 1], relationships));
    parts.push(`${fromName} → ${rel} → ${toName}`);
  }

  return parts.join(' | ');
}

function buildPathLabels(path: string[], persons: Person[]) {
  return path.map((id) => findPersonName(id, persons));
}

function assembleTraceResult(
  primaryPath: string[],
  persons: Person[],
  relationships: Relationship[],
  alternatePaths: string[][] = []
): TraceResult {
  return {
    primaryPath,
    alternatePaths,
    explanation: buildExplanation(primaryPath, persons, relationships),
    pathType: inferPathType(primaryPath, relationships),
    side: inferSide(primaryPath, relationships),
    pathLabels: buildPathLabels(primaryPath, persons),
  };
}

export function buildTraceResult(
  startId: string,
  endId: string,
  persons: Person[],
  relationships: Relationship[]
): TraceResult | null {
  const primaryPath = bfsShortestPath(startId, endId, relationships);
  if (!primaryPath) return null;

  const alternatePaths = bfsAlternatePaths(startId, endId, relationships);

  return assembleTraceResult(primaryPath, persons, relationships, alternatePaths);
}

export function traceRelation(
  startId: string,
  endId: string,
  persons: Person[],
  relationships: Relationship[]
): TraceResult | null {
  return buildTraceResult(startId, endId, persons, relationships);
}