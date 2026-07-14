import { useQuery } from '@apollo/client/react'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
    console.log("Recommended rendered")

    const result = useQuery(ME)

    const booksResult = useQuery(ALL_BOOKS, {
        skip: !result.data || !result.data?.me,
        variables: {
            genre: result.data?.me?.favoriteGenre
        }
    })

    console.log(result.data)
    console.log(booksResult.data)

    if (!show) {
      return null
    }

    if (result.loading || booksResult.loading) {
      return <div>loading...</div>
    }

    if (!result.data?.me) {
      return <div>No user found</div>
    }

    const favoriteGenre = result.data.me.favoriteGenre
    const books = booksResult.data.allBooks

    return (
      <div>
        <h2>recommendations</h2>

        <p>
            books in your favorite genre <b>{favoriteGenre}</b>
        </p>

        <table>
            <tbody>
            <tr>
                <th>title</th>
                <th>author</th>
                <th>published</th>
            </tr>

            {books.map(book => (
                <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    )
}

export default Recommended