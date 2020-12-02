import React from 'react';

export default function ShowAnecdote({anecdote}) {
  return (
    <>
    <h1>{anecdote.content} by {anecdote.author}</h1>
    <p>{`anecdote has ${anecdote.votes} votes`}</p>
    <p>{`for more info see ${anecdote.info}`}</p>
    </>
  );
}
