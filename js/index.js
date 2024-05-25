/**
 * Paginates, filters, sorts through the list of books, displaying 12 at a time
 * @param books
 */
async function paginate(books) {
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

/**
 * Creates the Handlebars model to display the pagination links
 * @param pageCount
 * @param currentPage
 * @param currentSorting
 * @returns {{active: string, page: number, sort: *}[]}
 */
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

/**
 * Represents the sorting selection
 * @type {{ALPHA_UP: string, AUTHOR_UP: string, PRICE_DOWN: string, AUTHOR_DOWN: string, ALPHA_DOWN: string, DEFAULT: string, PRICE_UP: string}}
 */
const SORTING = {
  DEFAULT: "Reset Sorting",
  ALPHA_UP: "Name A-Z",
  ALPHA_DOWN: "Name Z-A",
  PRICE_UP: "Price (Low-High)",
  PRICE_DOWN: "Price (High-Low)",
  AUTHOR_UP: "Author A-Z",
  AUTHOR_DOWN: "Author Z-A",
}

/**
 * Creates the Handlebars model to display the sorting selection
 * @param currentSorting
 * @returns {*[]}
 */
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

/**
 * Handles the actual sorting
 * @param books
 * @param currentSorting
 * @returns {*}
 */
function handleSorting(books, currentSorting) {
  switch (currentSorting) {
    case 'DEFAULT':
    case 'ALPHA_UP':
      books.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
      })
      break
    case 'ALPHA_DOWN':
      books.sort(function (a, b) {
        return a.title < b.title ? 1 : a.title > b.title ? -1 : 0
      })
      break
    case 'PRICE_UP':
      books.sort(function (a, b) {
        return a.price - b.price
      })
      break
    case 'PRICE_DOWN':
      books.sort(function (a, b) {
        return b.price - a.price
      })
      break
    case 'AUTHOR_UP':
      books.sort(function (a, b) {
        return a.author < b.author ? -1 : a.author > b.author ? 1 : 0
      })
      break
    case 'AUTHOR_DOWN':
      books.sort(function (a, b) {
        return a.author < b.author ? 1 : a.author > b.author ? -1 : 0
      })
  }
  return books
}

/**
 * Is used by the sorting dropdown to change the URL and trigger the sorting
 * @param select - a HTML `select` field
 */
function triggerSorting(select) {
  const searchParams = new URLSearchParams(location.search)
  searchParams.set('sort', select.value)
  searchParams.set('page', "1")
  location.search = searchParams.toString()
}

/**
 * Represents the book genres
 * @type {{economics: string, psychology: string, computer_science: string, fiction: string, mathematics: string, science: string, nonfiction: string, data_science: string, history: string, comic: string, philosophy: string, signal_processing: string}}
 */
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

/**
 * Creates the Handlebars model to display the genre links
 * @param currentGenre
 * @returns {*[]}
 */
function createGenreModel(currentGenre) {
  const genres = []
  for (const [key, value] of Object.entries(GENRES)) {
    const entry = {
      value: key,
      active: key === currentGenre ? 'active' : '',
      title: value,
    }
    genres.push(entry)
  }
  return genres
}

/**
 * Handles the actual filtering by the current genre
 * @param books
 * @param currentGenre
 * @param searchTerm
 * @returns {*}
 */
function handleGenres(books, currentGenre, searchTerm) {
  let filteredBooks = books
  if (currentGenre) {
    filteredBooks = books.filter(function (book) {
      return book.genre === currentGenre
    })
  }
  if (searchTerm) {
    const searchTermLower = searchTerm.toLowerCase()
    filteredBooks = filteredBooks.filter(function (book) {
      return book.title.toLowerCase().includes(searchTermLower)
        || book.author.toLowerCase().includes(searchTermLower)
    })
  }
  // if genre is empty, return all books
  return filteredBooks
}

/**
 * Adds the search term to the URL and triggers the search
 * @param searchTerm
 * @returns {boolean}
 */
function triggerSearch(searchTerm) {
  if (searchTerm) {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('search', searchTerm)
    location.search = searchParams.toString()
  }
  return false
}


document.addEventListener("DOMContentLoaded", function (event) {
  paginate(data.books)
  setTimeout(function () {
    initCart('#partial-header')
  }, 50)
})

