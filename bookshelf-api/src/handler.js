const { nanoid } = require('nanoid')
const pool = require('./db')

const addBook = async (req, res) => {
  try {
    const { title, author, year, isComplete } = req.body

    if (!title || !author || !year) {
      return res.status(400).json({
        status: 'fail',
        message: 'Judul, penulis, dan tahun wajib diisi',
      })
    }

    const id = nanoid()
    const now = new Date().toISOString()

    const query = `
      INSERT INTO books (id, title, author, year, is_complete, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      id,
      title.trim(),
      author.trim(),
      Number(year),
      Boolean(isComplete),
      now,
      now,
    ]

    await pool.query(query, values)

    return res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    })
  }
}

const getBooks = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM books ORDER BY created_at DESC'
    )

    const books = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      author: row.author,
      year: row.year,
      isComplete: row.is_complete,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }))

    return res.json({
      status: 'success',
      data: {
        books,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    })
  }
}

const updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const { title, author, year, isComplete } = req.body

    const existing = await pool.query('SELECT * FROM books WHERE id = $1', [id])

    if (existing.rowCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
    }

    const book = existing.rows[0]

    await pool.query(
      `
      UPDATE books
      SET title = $1,
          author = $2,
          year = $3,
          is_complete = $4,
          updated_at = $5
      WHERE id = $6
      `,
      [
        title ?? book.title,
        author ?? book.author,
        year !== undefined ? Number(year) : book.year,
        isComplete !== undefined ? Boolean(isComplete) : book.is_complete,
        new Date().toISOString(),
        id,
      ]
    )

    return res.json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    })
  }
}

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING id', [
      id,
    ])

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
    }

    return res.json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan server',
    })
  }
}

module.exports = {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
}