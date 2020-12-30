import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import GenreSelect from './GenreSelect'

const Books = (props) => {
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS);

  const [genre, setGenre] = useState(null)

  useEffect(() => {
    getBooks({variables: {genre}})
  },[genre])

  if (!props.show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre ? genre : 'all genres'}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <GenreSelect setGenre={setGenre} />
    </div>
  )
}

export default Books
