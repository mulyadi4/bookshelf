import { useEffect, useState } from 'react'
import BookForm from './components/BookForm'
import SearchBook from './components/SearchBook'
import BookList from './components/BookList'
import EditBook from './components/EditBook'
import { getBooks, addBook, updateBook, deleteBook } from './utils/booksApi'

function App() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [editingBook, setEditingBook] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const loadBooks = async () => {
    const data = await getBooks()
    setBooks(data)
  }

  useEffect(() => {
    loadBooks()
  }, [])

  const handleAdd = async (book) => {
    await addBook(book)
    loadBooks()
  }

  const handleToggle = async (id) => {
    const book = books.find((item) => item.id === id)
    if (!book) return

    await updateBook(id, {
      ...book,
      isComplete: !book.isComplete,
    })

    loadBooks()
  }

  const handleDelete = async (id) => {
    await deleteBook(id)
    loadBooks()
  }

  const handleEditOpen = (book) => {
    setEditingBook(book)
    setIsEditOpen(true)
  }

  const handleEditClose = () => {
    setEditingBook(null)
    setIsEditOpen(false)
  }

  const handleEditSave = async (id, updatedBook) => {
    await updateBook(id, updatedBook)
    handleEditClose()
    loadBooks()
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  )

  const searchResults = search.trim() ? filteredBooks : []

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Bookshelf App
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Simpan, cari, edit, dan kelola buku dengan tampilan yang lebih rapi.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <BookForm addBook={handleAdd} />
          <SearchBook
            search={search}
            onSearch={setSearch}
            results={searchResults}
          />
        </div>

        <div className="mt-6 grid gap-6">
          <BookList
            title="Belum selesai dibaca"
            books={filteredBooks.filter((book) => !book.isComplete)}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEditOpen}
          />

          <BookList
            title="Selesai dibaca"
            books={filteredBooks.filter((book) => book.isComplete)}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEditOpen}
          />
        </div>

        <EditBook
          isOpen={isEditOpen}
          book={editingBook}
          onClose={handleEditClose}
          onSave={handleEditSave}
        />
      </main>
    </div>
  )
}

export default App