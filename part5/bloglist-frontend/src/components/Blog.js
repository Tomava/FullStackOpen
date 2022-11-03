import { useState } from 'react'


const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    updateBlog({ ...blog, likes: (blog.likes + 1) })
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className='blog' >
      <div>
        {blog.title} {blog.author} <button id='blog-toggle-details-button' onClick={toggleDetails}> {showDetails ? 'hide': 'show'} </button>
      </div>
      {showDetails &&
        <div>
          <div>
            {blog.url}
          </div>
          <div>
          likes {blog.likes} <button id='blog-like-button' onClick={handleLike}> like </button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {currentUser.username === blog.user.username &&
          <div>
            <button id='blog-remove-button' onClick={handleDelete}> remove </button>
          </div>
          }
        </div>
      }
    </div>
  )
}

export default Blog