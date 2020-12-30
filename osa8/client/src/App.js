import { useApolloClient, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { FAVORITE_GENRE } from './queries';


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  const result = useQuery(FAVORITE_GENRE)

  const client = useApolloClient()

  const logout = (e) => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={logout}>logout</button>
          </>
        )
        :
      (
        <button onClick={() => setPage('login')}>login</button>
      )
      }
      </div>
      {error ? <p>{error}</p> : null }

      <Authors show={page === 'authors'} setError={setError}/>

      <Books show={page === 'books'}  />

      <NewBook show={page === 'add'} setError={setError} />
      
      <LoginForm show={page === 'login'} setToken={setToken} setError={setError} setPage={setPage} />

      <Recommended show={page === 'recommended'} favGenre={result.data.me.favoriteGenre} />
    </div>
  )
}

export default App
