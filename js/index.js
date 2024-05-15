function paginate(books) {
  const params = new URLSearchParams(location.search)
  const currentPage = parseInt(params.get('page')) || 1
  const currentSorting = params.get('sort')
  const currentGenre = params.get('genre')
  const searchTerm = params.get('search')

  const filteredBooks = handleGenres(books, currentGenre, searchTerm)
  const totalBooks = filteredBooks.length
  const size = 12

  const pageCount = Math.ceil(totalBooks / size)
  const pages = createPagingModel(pageCount, currentPage, currentSorting)

  let from = (currentPage - 1) * size
  const to = Math.min(from + size, totalBooks)

  const sortedBooks = handleSorting(filteredBooks, currentSorting)

  render({
    genres: createGenreModel(currentGenre),
    genre: currentGenre,

    search: searchTerm,
    sorting: createSortingModel(currentSorting),
    sort: currentSorting,

    books: sortedBooks.slice(from, to),

    from: ++from,
    to: to,
    totalBooks: totalBooks,

    currentPage: currentPage,
    pages: pages,
    prevPage: Math.max(currentPage - 1, 1),
    nextPage: Math.min(currentPage + 1, pageCount),
  })
}

function createPagingModel(pageCount, currentPage, currentSorting) {
  return Array.from({length: pageCount}, function (value, index) {
    const page = index + 1
    return {
      page: page,
      active: page === currentPage ? 'active' : '',
      sort: currentSorting
    }
  });
}

const SORTING = {
  DEFAULT: "Reset Sorting",
  ALPHA_UP: "Name A-Z",
  ALPHA_DOWN: "Name Z-A",
  PRICE_UP: "Price (Low-High)",
  PRICE_DOWN: "Price (High-Low)",
  AUTHOR_UP: "Author A-Z",
  AUTHOR_DOWN: "Author Z-A",
}

function createSortingModel(currentSorting) {
  const sorting = []
  for (const [key, value] of Object.entries(SORTING)) {
    const entry = {
      value: key,
      selected: (key === currentSorting) ? "selected" : "",
      label: value,
    }
    sorting.push(entry)
  }
  return sorting
}

function handleSorting(books, currentSorting) {
  switch (currentSorting) {
    case 'DEFAULT':
    case 'ALPHA_UP':
      books.sort(function(a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
      })
      break
    case 'ALPHA_DOWN':
      books.sort(function(a, b) {
        return a.title < b.title ? 1 : a.title > b.title ? -1 : 0
      })
      break
    case 'PRICE_UP':
      books.sort(function(a, b) { return a.price - b.price })
      break
    case 'PRICE_DOWN':
      books.sort(function(a, b) { return b.price - a.price })
      break
    case 'AUTHOR_UP':
      books.sort(function(a, b) {
        return a.author < b.author ? -1 : a.author > b.author ? 1 : 0
      })
      break
    case 'AUTHOR_DOWN':
      books.sort(function(a, b) {
        return a.author < b.author ? 1 : a.author > b.author ? -1 : 0
      })
  }
  return books
}

function triggerSorting(element) {
  const searchParams = new URLSearchParams(location.search)
  searchParams.set('sort', element.value)
  searchParams.set('page', "1")
  location.search = searchParams.toString()
}

const GENRES = {
  comic: "Comics",
  computer_science: "Computer Science",
  data_science: "Data Science",
  economics: "Economics",
  fiction: "Fiction",
  history: "History",
  mathematics: "Mathematics",
  nonfiction: "Non-fiction",
  philosophy: "Philosophy",
  psychology: "Psychology",
  science: "Science",
  signal_processing: "Signal Processing"
}

function createGenreModel(currentGenre) {
  const genres = []
  for (const [key, value] of Object.entries(GENRES)) {
    const entry = {
      value: key,
      active: key === currentGenre? 'active' : '',
      title: value,
    }
    genres.push(entry)
  }
  return genres
}

function handleGenres(books, currentGenre, searchTerm) {
  let filteredBooks = books
  if (currentGenre) {
    filteredBooks = books.filter(function(book) {
      return book.genre === currentGenre
    })
  }
  if (searchTerm) {
    const searchTermLower = searchTerm.toLowerCase()
    filteredBooks = filteredBooks.filter(function(book) {
      return book.title.toLowerCase().includes(searchTermLower)
        || book.author.toLowerCase().includes(searchTermLower)
    })
  }
  // if genre is empty, return all books
  return filteredBooks
}

function triggerSearch(searchTerm) {
  if (searchTerm) {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('search', searchTerm)
    location.search = searchParams.toString()
  }
  return false
}
