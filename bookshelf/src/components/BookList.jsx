import BookItem from './BookItem'

function BookList({ title, books, onToggle, onDelete, onEdit }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-lg shadow-black/20">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      <div className="mt-5 grid gap-4">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </section>
  )
}

export default BookList