import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const aResult = useQuery(ALL_AUTHORS)
  const bResult = useQuery(ALL_BOOKS)
  
  if (aResult.loading || bResult.loading) {
    return <div>loading...</div>
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={aResult.data?.allAuthors} />

      <Books show={page === 'books'} books={bResult.data?.allBooks} />

      <NewBook show={page === 'add'} allAuthors={ALL_AUTHORS} allBooks={ALL_BOOKS} />
    </div>
  )
}

export default App
