const BASE_URL = 'http://localhost:9000'


export async function getBooks() {
  const res = await fetch(`${BASE_URL}/books`)
  const data = await res.json()
  return data.data.books
}

export async function addBook(book) {
  await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
}

export async function updateBook(id, book) {
  await fetch(`${BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
}

export async function deleteBook(id) {
  await fetch(`${BASE_URL}/books/${id}`, {
    method: 'DELETE',
  })
}

