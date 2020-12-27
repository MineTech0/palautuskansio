import { useQuery } from '@apollo/client'
import React from 'react'
import { GENRES } from '../queries'

export default function GenreSelect({ setGenre }) {
  const result = useQuery(GENRES)

  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <>
      {result.data.genres.map((a, i) => (
        <button key={i} onClick={() => setGenre(a)}>
          {a}
        </button>
      ))}
      <button key={-1} onClick={() => setGenre(null)}>
        all genres
      </button>
    </>
  )
}
