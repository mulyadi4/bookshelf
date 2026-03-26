const STORAGE_KEY = 'BOOKSHELF_APPS'

export function getBooks() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}


export function generateId() {
  return Date.now();
}

export function createBook({ title, author, year, isComplete }) {
  return {
    id: generateId(),
    title,
    author,
    year: Number(year),
    isComplete,
  };
}

export function toggleBook(books, id) {
  return books.map(book =>
    book.id === id ? { ...book, isComplete: !book.isComplete } : book
  );
}

export function deleteBook(books, id) {
  return books.filter(book => book.id !== id);
}

export function editBook(books, id, newData) {
  return books.map(book =>
    book.id === id ? { ...book, ...newData } : book
  );
}

export function searchBooks(books, query) {
  return books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
}