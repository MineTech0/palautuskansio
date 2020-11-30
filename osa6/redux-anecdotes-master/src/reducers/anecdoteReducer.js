import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const a = await anecdoteService.vote({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: a
    })
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const a = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: a,
    })
  }
}



const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return state.map(anecdote =>
        action.data.id !== anecdote.id ? anecdote : action.data 
      )
    case "NEW_ANECDOTE":
        return state.concat(action.data)
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export default reducer 