  
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import EditBorn from './EditBorn'

const Authors = (props) => {
  
  const result = useQuery(ALL_AUTHORS)
  
  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  if(!result.data.allAuthors){
    return <p>no authors</p>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
        <EditBorn authors={result.data.allAuthors} setError={props.setError} />
    </div>
  )
}

export default Authors
