import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED, FAVORITE_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)
    addedBook.genres.forEach((g) => {
      const dataInStore = client.readQuery({
        query: ALL_BOOKS,
        variables: { genre: g },
      })
      if (!includedIn(dataInStore.allBooks, addedBook)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre: g },
          data: { allBooks: dataInStore.allBooks.concat(addedBook) },
        })
      }
    })
    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: {genre: null} })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: {genre: null},
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(
        `New book added: ${subscriptionData.data.bookAdded.title} by ${subscriptionData.data.bookAdded.author.name}`
      )
      console.log(subscriptionData.data.bookAdded)
      updateCacheWith(subscriptionData.data.bookAdded)
    },
  })

  const result = useQuery(FAVORITE_GENRE)

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
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      {error ? <p>{error}</p> : null}

      <Authors show={page === 'authors'} setError={setError} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={setError} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={setError}
        setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'}
        favGenre={token ? result.data.me.favoriteGenre : null}
      />
    </div>
  )
}

export default App
