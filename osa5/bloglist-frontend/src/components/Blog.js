import React, {useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user, setNotification, setBlogs, blogs }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = async (e) => {

    setLikes(likes+1)
     await blogService.update(blog.id, {
      
        user: blog.user,
        likes: likes + 1,
        author: blog.author,
        title:blog.title,
        url:blog.url
      }
    )
  }
  const handleRemove = async (e) => {
    if(window.confirm(`Remove blog ${blog.title}`)){
     try{
       await blogService.remove(blog.id)
       setNotification({
        error: false,
        message: `Blog ${blog.title} was deleted`
    })
     setBlogs(blogs.filter((a)=> a.id !== blog.id ));
     }
     catch(exception){
      setNotification({
        error: true,
        message: exception.message
    })
     }
    }
  }
  
  return(
    <div style={blogStyle} className='blogPost'>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='hiddenField'>
        <div>
      {blog.title} <button onClick={toggleVisibility}>Hide</button>
        </div>
      <p>{blog.url}</p>
      <p id='likeText'>{likes} <button onClick={handleLike}>Like</button></p>
      <p>{blog.author}</p>
      {blog.user?.username === user.username ? 
        <button onClick={handleRemove}>Remove</button>
      :
      null
    }
          
      </div>
    </div>
  )

}

export default Blog
