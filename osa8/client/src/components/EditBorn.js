import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

export default function EditBorn({ authors, setError }) {
  const [born, setBorn] = useState('')
  const [author, setAuthor] = useState(authors[0].name)

  const [editBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError('error')
      setTimeout(() => {
        setError(null)
      }, 4000)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    editBorn({
      variables: { name: author, setBornTo: parseInt(born) },
    })
    setBorn('')
    setAuthor('')
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
            {authors.map((a, i) => (
              <option key={i} value={a.name}>
                {a.name}
              </option>
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
