import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'

const BirthForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ changeYear ] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (e) => {
    e.preventDefault()

    changeYear({ variables: { name, born: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthForm
