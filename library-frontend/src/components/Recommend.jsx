import { useQuery } from '@apollo/client/react'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const result = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (!props.show) return null
  if (result.loading || user.loading) return <div>loading...</div>
  const books = result.data.allBooks ?? []
  const selectedGenre = user.data.me?.favoriteGenre

  const filteredBooks = selectedGenre
    ? books.filter(b => b.genres.includes(selectedGenre))
    : books

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{selectedGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
