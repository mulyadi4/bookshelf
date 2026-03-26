function SearchBook({ onSearch, search }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold text-white">Cari Buku</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Ketik judul buku..."
        className="mt-5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
      />
    </section>
  )
}

export default SearchBook