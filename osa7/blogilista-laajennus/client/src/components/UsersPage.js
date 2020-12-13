/* eslint-disable no-unused-vars */
import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function UserPage() {

  const users = useSelector(state => state.users)

  if(!users){
    return null
  }
  const tableStyle = {
    emptyCells: 'hide'
  }
  return (
    <>
      <h1>Users</h1>
      <Table striped bordered hover style={tableStyle}>
        <thead>
          <tr>
            <th/>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>

          ))}
        </tbody>
      </Table>
    </>
  )
}
