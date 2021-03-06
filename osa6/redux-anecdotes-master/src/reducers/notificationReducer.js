
  export const resetNotification = () => {
    return {
      type: 'RESET_NOTIFICATION'
    }
  }
  export const setNotification = (content, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content
      })
      let timeout
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        console.log('reset notification')
        dispatch({
          type: 'RESET_NOTIFICATION'
        })
      }, time*1000);
    }
  }
  
  
  const reducer = (state = null, action) => {
    switch (action.type) {
      case "SET_NOTIFICATION":
          return  action.content
      case "RESET_NOTIFICATION":
          return null
      default:
        return state
    }
  }
  
  export default reducer 