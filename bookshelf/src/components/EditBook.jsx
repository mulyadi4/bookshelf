import { useEffect, useState } from 'react'

function EditBook({ isOpen, book, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (book) {
      setTitle(book.title || '')
      setAuthor(book.author || '')
      setYear(book.year || '')
      setIsComplete(Boolean(book.isComplete))
    }
  }, [book])

  if (!isOpen || !book) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(book.id, {
      ...book,
      title: title.trim(),
      author: author.trim(),
      year: Number(year),
      isComplete,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Edit Buku</h2>
            <p className="mt-1 text-sm text-slate-400">Ubah data buku di sini.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            placeholder="Judul"
            required
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            placeholder="Penulis"
            required
          />
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
            placeholder="Tahun"
            required
          />

          <label className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
            Selesai dibaca
          </label>

          <div className="flex gap-3 pt-2">

            <button
              type="submit"
              className="flex-1 rounded-2xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook