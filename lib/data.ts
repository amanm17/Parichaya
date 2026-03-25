import { hasSupabase, supabase } from '@/lib/supabase';
import { samplePersons, sampleRelationships, sampleUpdates } from '@/lib/sampleData';
import { Person, Relationship, UpdateItem } from '@/lib/types';

export async function getPersons(): Promise<Person[]> {
  if (!hasSupabase || !supabase) return samplePersons;
  const { data, error } = await supabase.from('persons').select('*').order('name');
  if (error || !data) return samplePersons;
  return data as Person[];
}

export async function getRelationships(): Promise<Relationship[]> {
  if (!hasSupabase || !supabase) return sampleRelationships;
  const { data, error } = await supabase.from('relationships').select('*');
  if (error || !data) return sampleRelationships;
  return data as Relationship[];
}

export async function getUpdates(): Promise<UpdateItem[]> {
  if (!hasSupabase || !supabase) return sampleUpdates;
  const { data, error } = await supabase.from('updates').select('*').order('created_at', { ascending: false });
  if (error || !data) return sampleUpdates;
  return data as UpdateItem[];
}

export async function getPersonById(id: string): Promise<Person | null> {
  const persons = await getPersons();
  return persons.find((person) => person.id === id) ?? null;
}
