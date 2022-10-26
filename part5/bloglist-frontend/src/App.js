import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const setNotification = (message) => {
    setNotificationMessage(message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
  }

  const setError = (message) => {
    setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong credentials')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      const addedBlog = await blogService.add(newBlog)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setBlogs(blogs.concat(addedBlog))
      setNotification(`Added ${addedBlog.title} by ${addedBlog.author}`)
    } catch (exception) {
      setError('something went wrong')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const loginView = () => (
    <div>
      <h2>Log in to application</h2>
      {loginForm()}
    </div>
  )

  const blogsForm = () => (
    <form onSubmit={handleBlogCreation}>
      <div>
          title:
          <input
            type="text"
            value={blogTitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
      </div>
      <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
      </div>
      <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const blogsView = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout </button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>Create new</h2>
      {blogsForm()}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userString = window.localStorage.getItem('loggedBlogUser')
    if (userString) {
      const user = JSON.parse(userString)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={notificationMessage} className="notification" />
      <Notification message={errorMessage} className="error" />
      {user === null ?
      loginView():
      blogsView()}
    </div>
    
  )
}

export default App
