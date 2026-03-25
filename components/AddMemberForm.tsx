'use client';

import { useMemo, useState } from 'react';
import { hasSupabase, supabase } from '@/lib/supabase';
import { Person } from '@/lib/types';

type Props = {
  existingPeople: Person[];
};

export function AddMemberForm({ existingPeople }: Props) {
  const [status, setStatus] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    gender: 'unspecified',
    birth_year: '',
    is_deceased: false,
    death_year: '',
    description: '',
    relationTarget: '',
    relationType: 'parent'
  });

  const duplicates = useMemo(() => {
    const lower = form.name.trim().toLowerCase();
    if (!lower) return [];
    return existingPeople.filter((person) => person.name.toLowerCase().includes(lower)).slice(0, 3);
  }, [existingPeople, form.name]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasSupabase || !supabase) {
      setStatus('Demo mode: connect Supabase to save new members.');
      return;
    }

    const { data, error } = await supabase
      .from('persons')
      .insert({
        name: form.name,
        nickname: form.nickname || null,
        gender: form.gender,
        birth_year: form.birth_year ? Number(form.birth_year) : null,
        is_deceased: form.is_deceased,
        death_year: form.is_deceased && form.death_year ? Number(form.death_year) : null,
        description: form.description || null
      })
      .select('id')
      .single();

    if (error || !data) {
      setStatus('Could not save the member. Check Supabase table policies and environment variables.');
      return;
    }

    if (form.relationTarget) {
      await supabase.from('relationships').insert({
        from_person: form.relationType === 'child' ? form.relationTarget : data.id,
        to_person: form.relationType === 'child' ? data.id : form.relationTarget,
        relation_type: form.relationType
      });
    }

    await supabase.from('updates').insert({
      type: 'member_added',
      message: `${form.name} was added to the family graph.`,
      person_id: data.id,
      metadata: {
        relationTarget: form.relationTarget || null,
        relationType: form.relationTarget ? form.relationType : null
      }
    });

    setStatus('Member added successfully. Refresh the tree or updates page to see the new entry.');
    setForm({
      name: '',
      nickname: '',
      gender: 'unspecified',
      birth_year: '',
      is_deceased: false,
      death_year: '',
      description: '',
      relationTarget: '',
      relationType: 'parent'
    });
  }

  return (
    <form className="card p-6" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold text-slate-900">Add a member</h2>
      <p className="mt-2 text-sm text-slate-500">Create a new profile and optionally link that person to someone already in the graph.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="label">Full name</label>
          <input className="field" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
          {duplicates.length > 0 && (
            <div className="mt-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
              <p className="font-medium text-slate-900">Possible existing matches</p>
              <ul className="mt-1 space-y-1">
                {duplicates.map((person) => <li key={person.id}>{person.name}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label className="label">Nickname</label>
          <input className="field" value={form.nickname} onChange={(e) => setForm((prev) => ({ ...prev, nickname: e.target.value }))} />
        </div>

        <div>
          <label className="label">Gender</label>
          <select className="field" value={form.gender} onChange={(e) => setForm((prev) => ({ ...prev, gender: e.target.value }))}>
            <option value="unspecified">Unspecified</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="label">Year of birth</label>
          <input className="field" type="number" value={form.birth_year} onChange={(e) => setForm((prev) => ({ ...prev, birth_year: e.target.value }))} />
        </div>

        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea className="field min-h-28" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
          <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={form.is_deceased} onChange={(e) => setForm((prev) => ({ ...prev, is_deceased: e.target.checked }))} />
            This member is deceased
          </label>
          {form.is_deceased && (
            <div className="mt-4 max-w-sm">
              <label className="label">Year of death</label>
              <input className="field" type="number" value={form.death_year} onChange={(e) => setForm((prev) => ({ ...prev, death_year: e.target.value }))} />
            </div>
          )}
        </div>

        <div>
          <label className="label">Link to an existing person</label>
          <select className="field" value={form.relationTarget} onChange={(e) => setForm((prev) => ({ ...prev, relationTarget: e.target.value }))}>
            <option value="">No relation for now</option>
            {existingPeople.map((person) => <option key={person.id} value={person.id}>{person.name}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Relation type</label>
          <select className="field" value={form.relationType} onChange={(e) => setForm((prev) => ({ ...prev, relationType: e.target.value }))}>
            <option value="parent">Parent of selected person</option>
            <option value="child">Child of selected person</option>
            <option value="sibling">Sibling of selected person</option>
            <option value="spouse">Spouse of selected person</option>
            <option value="honorary">Honorary connection</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">Save member</button>
        {status && <p className="text-sm text-slate-600">{status}</p>}
      </div>
    </form>
  );
}
