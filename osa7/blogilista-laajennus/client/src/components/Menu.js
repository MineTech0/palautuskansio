import React from 'react'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../redusers/authReducer'

export default function Menu() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut())
  }

  return (
    <Navbar bg="light" expand="lg" className='mb-4'>
      <Navbar.Brand as={Link} to="/">Blog application</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Blogs</Nav.Link>
          <Nav.Link as={Link} to="/users">Users</Nav.Link>
        </Nav>
        <Navbar.Text>
          {user.name} logged in <Button onClick={logout} size="sm" variant="outline-dark">Log out</Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}
