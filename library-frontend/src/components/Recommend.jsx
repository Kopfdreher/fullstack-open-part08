import { useQuery } from '@apollo/client/react'
import { ME, ALL_BOOKS } from '../queries'
import BooksList from './BooksList'

const Recommend = (props) => {
  const user = useQuery(ME)
  const selectedGenre = user.data?.me.favoriteGenre
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    skip: !selectedGenre,
  })

  if (!props.show) return null
  if (result.loading || user.loading) return <div>loading...</div>
  const books = result.data.allBooks ?? []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{selectedGenre}</strong></p>
      <BooksList books={books} />
    </div>
  )
}

export default Recommend
