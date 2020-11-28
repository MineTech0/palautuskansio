import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer';
export default function AnecdoteList() {

    const anecdotes = useSelector(state => {
      if ( state.filter === "" ) {
        return state.anecdote
      }
      return state.anecdote.filter(a => a.indexOf(state.filter) !== -1)
    })
    const dispatch = useDispatch()
  
    const vote = (id,content) => {
      dispatch(voteAnecdote(id))
      dispatch(sortAnecdotes())
      dispatch(voteNotification(content))
    }
  return (
    <>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
}
