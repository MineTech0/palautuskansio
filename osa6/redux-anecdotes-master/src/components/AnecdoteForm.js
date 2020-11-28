import React from 'react';
import { useDispatch } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'

export default function AnecdoteForm() {

    const dispatch = useDispatch()
    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(sortAnecdotes())
      }
  return (
    <>
    <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  );
}
