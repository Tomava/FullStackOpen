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
    console.log(currentUser)
    console.log(blog.user)
    updateBlog({ ...blog, likes: (blog.likes + 1) })
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}> {showDetails ? 'hide': 'show'} </button>
      </div>
      {showDetails &&
        <div>
          <div>
            {blog.url}
          </div>
          <div>
          likes {blog.likes} <button onClick={handleLike}> like </button>
          </div>
          <div>
            {blog.user.name}
          </div>
          {currentUser.username === blog.user.username &&
          <div>
            <button onClick={handleDelete}> remove </button>
          </div>
          }
        </div>
      }
    </div>
  )
}

export default Blog