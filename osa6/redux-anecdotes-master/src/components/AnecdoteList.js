import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteList(props) {

    const vote = (anecdote) => {
      props.voteAnecdote(anecdote)
      props.setNotification(`you voted ${anecdote.content}`, 5)
    }
  return (
    <>
    {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
}
const sort = (anecdotes) => {
  return anecdotes.slice().sort(function (a, b) {
    return b.votes - a.votes;
  })
}



const mapStateToProps = state => {
  if ( state.filter === "" ) {
    return {anecdotes: sort(state.anecdote)}
  }
  return {anecdotes: sort(state.anecdote.filter(a => a.content.includes(state.filter)))}
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList