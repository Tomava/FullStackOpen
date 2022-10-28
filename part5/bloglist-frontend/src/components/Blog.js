import { useState } from 'react'


const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    updateBlog({...blog, likes: (blog.likes + 1)})
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
        </div>
      } 
    </div>
  )
}

export default Blog