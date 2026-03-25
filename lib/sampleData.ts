import { Person, Relationship, UpdateItem } from '@/lib/types';

export const samplePersons: Person[] = [
  { id: 'p1', name: 'Jagannath Mishra', gender: 'male', birth_year: 1936, is_deceased: true, death_year: 2004, description: 'Oldest known lineage anchor in the sample graph.' },
  { id: 'p2', name: 'Kamala Mishra', gender: 'female', birth_year: 1941, is_deceased: false, description: 'Spouse-side expansion begins here.' },
  { id: 'p3', name: 'Raghunath Mishra', gender: 'male', birth_year: 1961, is_deceased: false, description: 'A bark member with both ancestors and descendants recorded.' },
  { id: 'p4', name: 'Madhabi Mishra', gender: 'female', birth_year: 1966, is_deceased: false, description: 'Connected through marriage and maternal links.' },
  { id: 'p5', name: 'Sanjay Mishra', gender: 'male', birth_year: 1988, is_deceased: false, description: 'Branch layer in the sample graph.' },
  { id: 'p6', name: 'Anita Mishra', gender: 'female', birth_year: 1991, is_deceased: false, description: 'Spouse branch that opens another family cluster.' },
  { id: 'p7', name: 'Aarav Mishra', gender: 'male', birth_year: 2018, is_deceased: false, description: 'Leaf member.' },
  { id: 'p8', name: 'Mira Mishra', gender: 'female', birth_year: 2021, is_deceased: false, description: 'Youngest generation leaf.' },
  { id: 'p9', name: 'Riya Das', gender: 'female', birth_year: 1987, is_deceased: false, description: 'Anita’s elder sister; used to demonstrate loops.' },
  { id: 'p10', name: 'Biren Mishra', gender: 'male', birth_year: 1970, is_deceased: false, description: 'Grandfather’s youngest brother in the loop example.' },
  { id: 'p11', name: 'Jon', gender: 'male', birth_year: 1990, is_deceased: false, description: 'Honorary family member treated like a brother.' },
  { id: 'p12', name: 'Tara Mishra', gender: 'female', birth_year: 2012, is_deceased: true, death_year: 2014, description: 'Angel Bloom example.' }
];

export const sampleRelationships: Relationship[] = [
  { id: 'r1', from_person: 'p1', to_person: 'p3', relation_type: 'parent' },
  { id: 'r2', from_person: 'p2', to_person: 'p3', relation_type: 'parent' },
  { id: 'r3', from_person: 'p3', to_person: 'p5', relation_type: 'parent' },
  { id: 'r4', from_person: 'p4', to_person: 'p5', relation_type: 'parent' },
  { id: 'r5', from_person: 'p5', to_person: 'p7', relation_type: 'parent' },
  { id: 'r6', from_person: 'p6', to_person: 'p7', relation_type: 'parent' },
  { id: 'r7', from_person: 'p5', to_person: 'p8', relation_type: 'parent' },
  { id: 'r8', from_person: 'p6', to_person: 'p8', relation_type: 'parent' },
  { id: 'r9', from_person: 'p5', to_person: 'p6', relation_type: 'spouse' },
  { id: 'r10', from_person: 'p6', to_person: 'p9', relation_type: 'sibling' },
  { id: 'r11', from_person: 'p1', to_person: 'p10', relation_type: 'sibling' },
  { id: 'r12', from_person: 'p9', to_person: 'p10', relation_type: 'spouse' },
  { id: 'r13', from_person: 'p11', to_person: 'p7', relation_type: 'honorary' },
  { id: 'r14', from_person: 'p3', to_person: 'p12', relation_type: 'parent' },
  { id: 'r15', from_person: 'p4', to_person: 'p12', relation_type: 'parent' }
];

export const sampleUpdates: UpdateItem[] = [
  { id: 'u1', type: 'member_added', message: 'Aarav Mishra was added as a new leaf in the family graph.', person_id: 'p7', created_at: '2026-03-25T10:15:00Z' },
  { id: 'u2', type: 'relation_added', message: 'A spouse connection was added between Anita Mishra and Sanjay Mishra.', person_id: 'p6', created_at: '2026-03-24T13:30:00Z' },
  { id: 'u3', type: 'loop_linked', message: 'A second family path was linked through Riya Das and Biren Mishra.', person_id: 'p9', created_at: '2026-03-23T08:45:00Z' },
  { id: 'u4', type: 'honorary_added', message: 'Jon was added under close family connections.', person_id: 'p11', created_at: '2026-03-22T18:20:00Z' }
];

export const sampleHighlights = [
  { label: 'Members', value: '12' },
  { label: 'Live branches', value: '4' },
  { label: 'Recent updates', value: '4' }
];
