const { nanoid } = require('nanoid')
const books = require('./books')

exports.addBook = (req, res) => {
  const { title, author, year, isComplete } = req.body

  if (!title || !author || !year) {
    return res.status(400).json({ message: 'Semua field wajib diisi' })
  }

  const newBook = {
    id: nanoid(),
    title,
    author,
    year: Number(year),
    isComplete: Boolean(isComplete),
  }

  books.push(newBook)
  res.json(newBook)
}

exports.getBooks = (req, res) => {
  res.json(books)
}

exports.updateBook = (req, res) => {
  const { id } = req.params
  const index = books.findIndex((b) => b.id === id)

  if (index === -1) return res.status(404).json({ message: 'Tidak ditemukan' })

  books[index] = { ...books[index], ...req.body }
  res.json(books[index])
}

exports.deleteBook = (req, res) => {
  const { id } = req.params
  const index = books.findIndex((b) => b.id === id)

  if (index === -1) return res.status(404).json({ message: 'Tidak ditemukan' })

  books.splice(index, 1)
  res.json({ message: 'Deleted' })
}