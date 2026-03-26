const express = require('express')
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require('./handler')

const router = express.Router()

router.get('/books', getBooks)
router.post('/books', addBook)
router.put('/books/:id', updateBook)
router.delete('/books/:id', deleteBook)

module.exports = router