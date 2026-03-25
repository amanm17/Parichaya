import type { Person, Relationship } from '@/lib/types';

export type GraphBundle = {
  persons: Person[];
  relationships: Relationship[];
};

export function getChildren(personId: string, relationships: Relationship[]) {
  return relationships.filter((r) => r.relation_type === 'parent' && r.from_person === personId).map((r) => r.to_person);
}

export function getParents(personId: string, relationships: Relationship[]) {
  return relationships.filter((r) => r.relation_type === 'parent' && r.to_person === personId).map((r) => r.from_person);
}

export function getSpouses(personId: string, relationships: Relationship[]) {
  return relationships
    .filter((r) => r.relation_type === 'spouse' && (r.from_person === personId || r.to_person === personId))
    .map((r) => (r.from_person === personId ? r.to_person : r.from_person));
}

export function getPersonMap(persons: Person[]) {
  return Object.fromEntries(persons.map((person) => [person.id, person])) as Record<string, Person>;
}

export function computeGenerationLevels(persons: Person[], relationships: Relationship[]) {
  const personIds = persons.map((p) => p.id);
  const childrenMap = new Map<string, string[]>();
  const parentsMap = new Map<string, string[]>();

  for (const id of personIds) {
    childrenMap.set(id, []);
    parentsMap.set(id, []);
  }

  relationships.forEach((r) => {
    if (r.relation_type === 'parent') {
      childrenMap.get(r.from_person)?.push(r.to_person);
      parentsMap.get(r.to_person)?.push(r.from_person);
    }
  });

  const level = new Map<string, number>();
  const queue: string[] = [];

  personIds.forEach((id) => {
    const children = childrenMap.get(id) || [];
    if (children.length === 0) {
      level.set(id, 0);
      queue.push(id);
    }
  });

  while (queue.length) {
    const current = queue.shift() as string;
    const currentLevel = level.get(current) ?? 0;
    for (const parent of parentsMap.get(current) || []) {
      const existing = level.get(parent);
      const candidate = currentLevel + 1;
      if (existing === undefined || candidate > existing) {
        level.set(parent, candidate);
        queue.push(parent);
      }
    }
  }

  personIds.forEach((id) => {
    if (!level.has(id)) level.set(id, 0);
  });

  return level;
}

export function describeSide(path: string[], relationships: Relationship[]) {
  let marriage = false;
  for (let i = 0; i < path.length - 1; i += 1) {
    const current = path[i];
    const next = path[i + 1];
    const edge = relationships.find(
      (r) =>
        (r.from_person === current && r.to_person === next) ||
        (r.from_person === next && r.to_person === current)
    );
    if (edge?.relation_type === 'spouse') marriage = true;
  }
  if (marriage) return 'Mixed / by marriage';
  return 'Bloodline';
}
