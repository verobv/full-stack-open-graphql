import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  const books = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading || books.loading) {
    return <div>loading...</div>
  }

  // const f_books = genre ? books.filter(b => b.genres.includes(genre)) : books

  const fbooks = result.data.allBooks

  const genres = [...new Set(
    books.data.allBooks.flatMap(b => b.genres)
  )]

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre ?? 'all'}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {fbooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}

        <button onClick={() => setGenre(null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
