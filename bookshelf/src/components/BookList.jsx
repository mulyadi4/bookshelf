import BookItem from './BookItem'

function BookList({ title, books, onToggle, onDelete, onEdit }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
          {books.length} buku
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        {books.length > 0 ? (
          books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 px-4 py-8 text-center text-sm text-slate-400">
            Belum ada buku di bagian ini.
          </div>
        )}
      </div>
    </section>
  )
}

export default BookList