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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Bookshelf App
          </h1>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <BookForm addBook={handleAdd} />
          <SearchBook search={search} onSearch={setSearch} />
        </div>

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