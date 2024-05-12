function paginate(books) {
  const params = new URLSearchParams(location.search)
  const currentPage = parseInt(params.get('page')) || 1
  const totalBooks = books.length
  const size = 15

  const pageCount = Math.ceil(totalBooks / size)
  const pages = Array.from({length: pageCount}, function (value, index) {
    const page = index + 1
    return {
      page: page,
      active: page === currentPage ? 'active' : ''
    }
  })

  let from = (currentPage - 1) * size
  const to = from + size

  render({
    books: books.slice(from, to),

    from: ++from,
    to: to,
    totalBooks: totalBooks,

    currentPage: currentPage,
    pages: pages,
    prevPage: Math.max(currentPage - 1, 1),
    nextPage: Math.min(currentPage + 1, pageCount)
  })
}
