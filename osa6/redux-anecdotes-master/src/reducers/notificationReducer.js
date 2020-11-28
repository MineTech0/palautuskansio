
  export const resetNotification = () => {
    return {
      type: 'RESET_NOTIFICATION'
    }
  }
  export const voteNotification = (content) => {
    return {
      type: 'VOTE_NOTIFICATION',
      content
    }
  }
  
  
  const reducer = (state = null, action) => {
    switch (action.type) {
      case "VOTE_NOTIFICATION":
          return  `You voted '${action.content}'`
      case "NEW_ANECDOTE":
          return `You created '${action.data}'`
      case "RESET_NOTIFICATION":
          return null
      default:
        return state
    }
  }
  
  export default reducer 