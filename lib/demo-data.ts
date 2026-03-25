import type { Person, Relationship, UpdateItem } from '@/lib/types';

export const demoPersons: Person[] = [
  { id: 'p1', name: 'Harinarayan Mishra', nickname: 'Hari Bapa', gender: 'male', birth_year: 1932, is_deceased: true, death_year: 2001, description: 'Earliest commonly remembered paternal anchor in the demo tree.', photo_url: null, honorary: false },
  { id: 'p2', name: 'Kamala Mishra', nickname: 'Kamala Amma', gender: 'female', birth_year: 1938, is_deceased: true, death_year: 2010, description: 'Spouse of Harinarayan.', photo_url: null, honorary: false },
  { id: 'p3', name: 'Prabhat Mishra', nickname: null, gender: 'male', birth_year: 1958, is_deceased: false, death_year: null, description: 'Eldest son and bark member in the demo lineage.', photo_url: null, honorary: false },
  { id: 'p4', name: 'Sanjukta Mishra', nickname: null, gender: 'female', birth_year: 1962, is_deceased: false, death_year: null, description: 'Spouse of Prabhat.', photo_url: null, honorary: false },
  { id: 'p5', name: 'Arindam Mishra', nickname: null, gender: 'male', birth_year: 1988, is_deceased: false, death_year: null, description: 'Branch generation member.', photo_url: null, honorary: false },
  { id: 'p6', name: 'Mitali Mishra', nickname: null, gender: 'female', birth_year: 1990, is_deceased: false, death_year: null, description: 'Spouse of Arindam.', photo_url: null, honorary: false },
  { id: 'p7', name: 'Aarav Mishra', nickname: null, gender: 'male', birth_year: 2016, is_deceased: false, death_year: null, description: 'Leaf generation.', photo_url: null, honorary: false },
  { id: 'p8', name: 'Shubhra Mishra', nickname: null, gender: 'male', birth_year: 1965, is_deceased: false, death_year: null, description: 'Youngest brother of the bark generation.', photo_url: null, honorary: false },
  { id: 'p9', name: 'Nandita Das', nickname: null, gender: 'female', birth_year: 1969, is_deceased: false, death_year: null, description: 'Spouse of Shubhra.', photo_url: null, honorary: false },
  { id: 'p10', name: 'Ritu Das', nickname: null, gender: 'female', birth_year: 1966, is_deceased: false, death_year: null, description: 'Elder sister of Nandita, creating a loop through marriage.', photo_url: null, honorary: false },
  { id: 'p11', name: 'Debashish Mishra', nickname: null, gender: 'male', birth_year: 1948, is_deceased: true, death_year: 2008, description: 'Youngest brother of Harinarayan.', photo_url: null, honorary: false },
  { id: 'p12', name: 'Ria Mishra', nickname: null, gender: 'female', birth_year: 2019, is_deceased: false, death_year: null, description: 'Second leaf generation child.', photo_url: null, honorary: false },
  { id: 'p13', name: 'Ishaan Mishra', nickname: null, gender: 'male', birth_year: 1993, is_deceased: false, death_year: null, description: 'Cousin branch child of Shubhra and Nandita.', photo_url: null, honorary: false },
  { id: 'p14', name: 'Jon Pereira', nickname: 'Jon', gender: 'male', birth_year: 1992, is_deceased: false, death_year: null, description: 'Very close to the family and treated like a brother.', photo_url: null, honorary: true },
  { id: 'p15', name: 'Tara Mishra', nickname: null, gender: 'female', birth_year: 2014, is_deceased: true, death_year: 2018, description: 'Angel Bloom example.', photo_url: null, honorary: false },
  { id: 'p16', name: 'Madhurima Das', nickname: null, gender: 'female', birth_year: 1991, is_deceased: false, death_year: null, description: 'Daughter of Ritu, useful for alternate trace examples.', photo_url: null, honorary: false },
  { id: 'p17', name: 'Niharika Mishra', nickname: null, gender: 'female', birth_year: 1986, is_deceased: false, death_year: null, description: 'Sibling branch example.', photo_url: null, honorary: false }
];

export const demoRelationships: Relationship[] = [
  { id: 'r1', from_person: 'p1', to_person: 'p3', relation_type: 'parent' },
  { id: 'r2', from_person: 'p2', to_person: 'p3', relation_type: 'parent' },
  { id: 'r3', from_person: 'p1', to_person: 'p8', relation_type: 'parent' },
  { id: 'r4', from_person: 'p2', to_person: 'p8', relation_type: 'parent' },
  { id: 'r5', from_person: 'p1', to_person: 'p11', relation_type: 'parent' },
  { id: 'r6', from_person: 'p2', to_person: 'p11', relation_type: 'parent' },
  { id: 'r7', from_person: 'p3', to_person: 'p5', relation_type: 'parent' },
  { id: 'r8', from_person: 'p4', to_person: 'p5', relation_type: 'parent' },
  { id: 'r9', from_person: 'p3', to_person: 'p17', relation_type: 'parent' },
  { id: 'r10', from_person: 'p4', to_person: 'p17', relation_type: 'parent' },
  { id: 'r11', from_person: 'p5', to_person: 'p7', relation_type: 'parent' },
  { id: 'r12', from_person: 'p6', to_person: 'p7', relation_type: 'parent' },
  { id: 'r13', from_person: 'p5', to_person: 'p12', relation_type: 'parent' },
  { id: 'r14', from_person: 'p6', to_person: 'p12', relation_type: 'parent' },
  { id: 'r15', from_person: 'p8', to_person: 'p13', relation_type: 'parent' },
  { id: 'r16', from_person: 'p9', to_person: 'p13', relation_type: 'parent' },
  { id: 'r17', from_person: 'p5', to_person: 'p15', relation_type: 'parent' },
  { id: 'r18', from_person: 'p6', to_person: 'p15', relation_type: 'parent' },
  { id: 'r19', from_person: 'p1', to_person: 'p2', relation_type: 'spouse' },
  { id: 'r20', from_person: 'p3', to_person: 'p4', relation_type: 'spouse' },
  { id: 'r21', from_person: 'p5', to_person: 'p6', relation_type: 'spouse' },
  { id: 'r22', from_person: 'p8', to_person: 'p9', relation_type: 'spouse' },
  { id: 'r23', from_person: 'p11', to_person: 'p10', relation_type: 'spouse' },
  { id: 'r24', from_person: 'p10', to_person: 'p16', relation_type: 'parent' },
  { id: 'r25', from_person: 'p14', to_person: 'p5', relation_type: 'honorary', relation_label: 'like_brothers' }
];

export const demoUpdates: UpdateItem[] = [
  { id: 'u1', type: 'member_added', message: 'A new leaf was added: Aarav Mishra.', person_id: 'p7', metadata: null, created_at: '2026-03-22T10:00:00.000Z' },
  { id: 'u2', type: 'relation_added', message: 'A spouse connection was added between Debashish Mishra and Ritu Das, creating a looped relation path.', person_id: 'p11', metadata: null, created_at: '2026-03-23T12:00:00.000Z' },
  { id: 'u3', type: 'member_added', message: 'Jon Pereira was added under honorary family connections.', person_id: 'p14', metadata: null, created_at: '2026-03-24T15:00:00.000Z' },
  { id: 'u4', type: 'profile_updated', message: 'More details were added to Tara Mishra’s profile in remembrance.', person_id: 'p15', metadata: null, created_at: '2026-03-25T09:30:00.000Z' }
];
