import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/tree', label: 'Tree' },
  { href: '/updates', label: 'Updates' },
  { href: '/add', label: 'Add Member' }
];

export function Navbar() {
  return (
    <header className="mb-8">
      <nav className="card flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-xl font-semibold tracking-tight text-root">
            Parichaya
          </Link>
          <p className="text-sm text-slate-500">A collaborative family relationship graph</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
