export type Gender = 'male' | 'female' | 'other' | 'unspecified';
export type RelationType =
  | 'parent'
  | 'child'
  | 'sibling'
  | 'spouse'
  | 'partner'
  | 'honorary'
  | 'guardian'
  | 'step_parent'
  | 'adoptive_parent';

export type Person = {
  id: string;
  name: string;
  nickname?: string | null;
  gender?: Gender | null;
  birth_year?: number | null;
  is_deceased?: boolean | null;
  death_year?: number | null;
  description?: string | null;
  photo_url?: string | null;
};

export type Relationship = {
  id: string;
  from_person: string;
  to_person: string;
  relation_type: RelationType;
  note?: string | null;
};

export type UpdateItem = {
  id: string;
  type: string;
  message: string;
  person_id?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string | null;
};
