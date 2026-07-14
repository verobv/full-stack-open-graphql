import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { useQuery, useApolloClient } from '@apollo/client/react'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const aResult = useQuery(ALL_AUTHORS)
  // const bResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  
  if (aResult.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  console.log("Current page:", page)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <button onClick={() => setPage('add')}>
            add book
          </button>
        )}
        {!token && (
          <button onClick={() => setPage('login')}>
            login
          </button>
        )}
        {token && (
          <button onClick={() => setPage('recommended')}>
            recommend
          </button>
        )}
        {token && (
          <button onClick={onLogout}>
            logout
          </button>
        )}
      </div>

      {errorMessage && (
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )}

      <Authors show={page === 'authors'} authors={aResult.data?.allAuthors} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} allAuthors={ALL_AUTHORS} allBooks={ALL_BOOKS} token={token} />

      <Recommended show={page === 'recommended'} />

      <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage} />
    </div>
  )
}

export default App
