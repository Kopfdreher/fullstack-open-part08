import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'

const BirthForm = ({ authors }) => {
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
        name <select
          value={name}
          onChange={({ target }) => setName(target.value)}
        >
          <option key='0' value=''></option>
          {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
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
