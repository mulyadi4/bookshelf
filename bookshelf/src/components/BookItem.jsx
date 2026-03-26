function BookItem({ book, onToggle, onDelete, onEdit }) {
  return (
    <article className="rounded-2xl border border-slate-700 bg-slate-950 p-5">
      <h3 className="text-lg font-semibold text-white">{book.title}</h3>
      <p className="mt-1 text-sm text-slate-300">Penulis: {book.author}</p>
      <p className="text-sm text-slate-400">Tahun: {book.year}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggle(book.id)}
          className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          {book.isComplete ? 'Belum selesai' : 'Selesai dibaca'}
        </button>

        <button
          type="button"
          onClick={() => onEdit(book.id)}
          className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-400"
        >
          Edit Buku
        </button>

        <button
          type="button"
          onClick={() => onDelete(book.id)}
          className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
        >
          Hapus Buku
        </button>
      </div>
    </article>
  )
}

export default BookItem