import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogsForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    createBlog(newBlog)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
          title:
        <input
          id="blogTitle-input"
          type="text"
          value={blogTitle}
          name="title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
          author:
        <input
          id="blogAuthor-input"
          type="text"
          value={blogAuthor}
          name="author"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
          url:
        <input
          id="blogUrl-input"
          type="text"
          value={blogUrl}
          name="url"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <button id="submit-button" type="submit">create</button>
    </form>
  )
}

BlogsForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogsForm