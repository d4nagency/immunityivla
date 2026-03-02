import Link from 'next/link';

export default function LocationsIndex() {
  const cities = ['WeHo','Santa Monica','Beverly Hills','DTLA'];
  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-slate-900">Locations</h1>
      <p className="text-sm text-slate-600 mb-6">Mobile IV service coverage in Greater Los Angeles.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cities.map((c) => (
          <Link key={c} href={`/locations/${encodeURIComponent(c)}`} className="rounded-lg border border-slate-200 p-4 hover:shadow-lg bg-white transition-all">
            <div className="flex items-center gap-3">
              <span className="inline-block w-4 h-4 bg-[#0d9488] rounded-full"/>
              <strong className="text-slate-900">{c}</strong>
            </div>
            <p className="text-xs text-slate-600 mt-1">Immune Boost IV — mobile & in-hotel</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
