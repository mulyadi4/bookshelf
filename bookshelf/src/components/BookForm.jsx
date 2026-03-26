import { useState } from 'react'

function BookForm({ addBook }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBook = {
      id: Date.now(),
      title,
      author,
      year: Number(year),
      isComplete,
    }

    addBook(newBook)

    setTitle('')
    setAuthor('')
    setYear('')
    setIsComplete(false)
  }

  const inputClass =
    'mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold text-white">Tambah buku baru</h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-slate-300">
            Judul
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="author" className="text-sm font-medium text-slate-300">
            Penulis
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="year" className="text-sm font-medium text-slate-300">
            Tahun
          </label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300">
          <input
            id="complete"
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
          />
          Selesai dibaca
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-500"
        >
          Simpan Buku
        </button>
      </form>
    </section>
  )
}

export default BookForm