import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

export default function EditBorn({authors}) {
  const [born, setBorn] = useState(null)
  const [author, setAuthor] = useState('')

  const [ editBorn ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    editBorn({  variables: { name: author, setBornTo: parseInt(born) } })
    setBorn('')
    setAuthor(null)
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          author
          <select
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          >
            {authors.map((a) => (
              <option>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}
