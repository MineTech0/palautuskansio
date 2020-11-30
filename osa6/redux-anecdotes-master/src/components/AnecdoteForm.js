import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';


function AnecdoteForm(props) {
    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`you created ${content}`, 5)
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
const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm