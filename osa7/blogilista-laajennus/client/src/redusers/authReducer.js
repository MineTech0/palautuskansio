import { setNotification } from './notificationReducer'
import loginService from '../services/login'

export const logOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}
export const logIn = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        user
      })
    } catch (e) {
      dispatch(setNotification('wrong username or password','danger',5))
    }

  }
}
export const initUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
    }

    dispatch({
      type: 'INIT_USER',
      user
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return  action.user
  case 'LOGOUT':
    return null
  case 'INIT_USER':
    return action.user
  default:
    return state
  }
}

export default reducer