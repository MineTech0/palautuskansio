import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_BOOKS } from '../queries';

export default function Recommended({favGenre, ...props}) {

  const result = useQuery(ALL_BOOKS,{variables: {genre: favGenre}})

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <>
    <h2>Recommendations</h2>
    <p>books in your favorite genre <b>{favGenre}</b></p>
    <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
