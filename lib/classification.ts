import { Person, Relationship } from '@/lib/types';

export type StructuralRole = 'ROOT' | 'BARK' | 'BRANCH' | 'LEAF' | 'ISOLATED';
export type OverlayRole = 'ANGEL_BLOOM' | 'HONORARY' | null;

function childrenOf(personId: string, relationships: Relationship[]) {
  return relationships
    .filter((edge) => edge.relation_type === 'parent' && edge.from_person === personId)
    .map((edge) => edge.to_person);
}

function honoraryLinks(personId: string, relationships: Relationship[]) {
  return relationships.some(
    (edge) => edge.relation_type === 'honorary' && (edge.from_person === personId || edge.to_person === personId)
  );
}

export function classifyRole(personId: string, relationships: Relationship[]): StructuralRole {
  const children = childrenOf(personId, relationships);
  if (children.length === 0) return 'LEAF';

  const childHasLeaf = children.some((child) => classifyRole(child, relationships) === 'LEAF');
  const childHasBranch = children.some((child) => classifyRole(child, relationships) === 'BRANCH');
  const childHasBark = children.some((child) => classifyRole(child, relationships) === 'BARK');

  if (childHasBark) return 'ROOT';
  if (childHasBranch) return 'BARK';
  if (childHasLeaf) return 'BRANCH';
  return 'ISOLATED';
}

export function classifyOverlay(person: Person, relationships: Relationship[]): OverlayRole {
  if (person.is_deceased && classifyRole(person.id, relationships) === 'LEAF') return 'ANGEL_BLOOM';
  if (honoraryLinks(person.id, relationships)) return 'HONORARY';
  return null;
}

export function colorForRole(role: StructuralRole, overlay: OverlayRole) {
  if (overlay === 'ANGEL_BLOOM') return '#f4d6df';
  if (overlay === 'HONORARY') return '#c86d4b';

  switch (role) {
    case 'ROOT':
      return '#425b3b';
    case 'BARK':
      return '#6f5e49';
    case 'BRANCH':
      return '#7aa16a';
    case 'LEAF':
      return '#d7edc2';
    default:
      return '#cbd5e1';
  }
}
