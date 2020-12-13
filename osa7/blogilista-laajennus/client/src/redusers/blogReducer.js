import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const createBlog = (newBlog) => {
  return async dispatch => {
    try {
      const savedBlog = await blogService.create(newBlog)
      dispatch({
        type: 'CREATE_BLOG',
        savedBlog
      })
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`,'success',5))
    } catch (e) {
      dispatch(setNotification(e.response.data.error,'danger',8))
      console.log(e)
    }
  }
}
export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}
export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const likedBlog = await blogService.update(blog.id,{ ...blog, likes: blog.likes+1 })
      dispatch(setNotification(`liked blog ${blog.title}`,'success',5))
      dispatch({
        type: 'UPDATE_BLOG',
        blog: likedBlog
      })
    } catch (e) {
      dispatch(setNotification(e.response.data.error,'danger',8))
    }
  }
}
export const commentBlog = (id,comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.comment(id,{ comment })
      dispatch(setNotification(`commented '${comment}'`,'success',5))
      dispatch({
        type: 'UPDATE_BLOG',
        blog: commentedBlog
      })
    } catch (e) {
      dispatch(setNotification(e.response.data.error,'danger',8))
    }
  }
}
export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch(setNotification(`removed blog ${blog.title}`,'success',5))
      dispatch({
        type: 'REMOVE_BLOG',
        id:blog.id
      })
    } catch (e) {
      dispatch(setNotification(e.response.data.error,'danger',8))
    }
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return  action.blogs
  case 'CREATE_BLOG':
    return  state.concat(action.savedBlog)
  case 'REMOVE_BLOG':
    return  state.filter(b => b.id !== action.id)
  case 'UPDATE_BLOG':
    return state.map(b => b.id === action.blog.id ? action.blog : b)
  default:
    return state
  }
}

export default reducer