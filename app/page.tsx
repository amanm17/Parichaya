import Link from 'next/link';
import { FeatureGrid } from '@/components/FeatureGrid';
import { sampleHighlights } from '@/lib/sampleData';

export default function HomePage() {
  return (
    <main className="space-y-10 py-6">
      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="card p-8 lg:p-10">
          <div className="badge bg-root/10 text-root">Cozy · Thriving · Subtle Vibrant</div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Parichaya brings your family graph to life.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Browse your family tree, add members, build spouse-side branches, trace exact relationships,
            and keep everyone on the same page with a friendly live updates feed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tree" className="btn-primary">Open Family Tree</Link>
            <Link href="/add" className="btn-secondary">Add a Member</Link>
            <Link href="/updates" className="btn-secondary">See Updates</Link>
          </div>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {sampleHighlights.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 px-4 py-4">
                <dt className="text-sm text-slate-500">{item.label}</dt>
                <dd className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="card p-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-root/80">What stands out</p>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Graph-first model.</span> Parichaya supports loops,
              multiple relation paths, spouse-side expansion, and people connected through more than one route.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Indian kinship-aware tracing.</span> The trace engine explains
              relations explicitly, such as “father’s younger brother’s wife”, with paternal, maternal, and marital context.
            </p>
            <p>
              <span className="font-semibold text-slate-900">Open contribution.</span> Anyone with the link can explore and add,
              while the updates feed keeps the family informed about what changed.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid />
    </main>
  );
}
