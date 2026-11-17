import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'
import BooksList from './BooksList'

const Books = (props) => {
  const all = useQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    fetchPolicy: 'network-only',
  })

  if (!props.show) return null
  if (all.loading || result.loading) return <div>loading...</div>
  const allBooks = all.data?.allBooks ?? []
  const genres = [...new Set(allBooks.flatMap(b => b.genres))]
  const books = result.data?.allBooks ?? []

  return (
    <div>
      <h2>books</h2>

      { selectedGenre && (
        <p>in genre <strong>{selectedGenre}</strong></p>
      )}

      <BooksList books={books} />
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
