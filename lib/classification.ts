import { Person, Relationship } from '@/lib/types';

export type StructuralRole = 'ROOT' | 'BARK' | 'BRANCH' | 'LEAF' | 'ISOLATED';
export type OverlayRole = 'ANGEL_BLOOM' | 'HONORARY' | null;
export type Classification = StructuralRole | Exclude<OverlayRole, null>;

function childrenOf(personId: string, relationships: Relationship[]) {
  return relationships
    .filter((edge) => edge.relation_type === 'parent' && edge.from_person === personId)
    .map((edge) => edge.to_person);
}

function honoraryLinks(personId: string, relationships: Relationship[]) {
  return relationships.some(
    (edge) =>
      edge.relation_type === 'honorary' &&
      (edge.from_person === personId || edge.to_person === personId)
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
  if (person.is_deceased && classifyRole(person.id, relationships) === 'LEAF') {
    return 'ANGEL_BLOOM';
  }
  if (honoraryLinks(person.id, relationships) || person.honorary) {
    return 'HONORARY';
  }
  return null;
}

export function classifyPerson(
  person: Person,
  _persons: Person[],
  relationships: Relationship[]
): Classification {
  const overlay = classifyOverlay(person, relationships);
  if (overlay) return overlay;
  return classifyRole(person.id, relationships);
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

export function badgeStyle(classification: Classification) {
  switch (classification) {
    case 'ROOT':
      return 'bg-root/10 text-root';
    case 'BARK':
      return 'bg-bark/10 text-bark';
    case 'BRANCH':
      return 'bg-branch/10 text-branch';
    case 'LEAF':
      return 'bg-leaf/20 text-leaf-900';
    case 'ANGEL_BLOOM':
      return 'bg-pink-100 text-pink-700';
    case 'HONORARY':
      return 'bg-accent/10 text-accent';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}
