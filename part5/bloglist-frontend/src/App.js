import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Togglable from './components/Togglable'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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

  const handleBlogCreation = async (newBlog) => {
    try {
      const addedBlog = await blogService.add(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setNotification(`Added ${addedBlog.title} by ${addedBlog.author}`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setError('something went wrong')
    }
  }

  const handleBlogUpdate = async (updatedBlog) => {
    try {
      const addedBlog = await blogService.update(updatedBlog)
      setBlogs(blogs.map(blog => blog.id === addedBlog.id ? { ...blog, likes: addedBlog.likes }: blog))
      setNotification(`Liked ${addedBlog.title} by ${addedBlog.author}`)
    } catch (exception) {
      setError('something went wrong')
    }
  }

  const handleBlogDeletion = async (deleteBlog) => {
    if (!window.confirm(`Remove blog ${deleteBlog.title} by ${deleteBlog.author}`)) {
      return
    }
    try {
      const deletedBlog = await blogService.remove(deleteBlog.id)
      setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
      setNotification(`Removed ${deletedBlog.title} by ${deletedBlog.author}`)
    } catch (exception) {
      setError('something went wrong')
    }
  }

  const loginView = () => (
    <div>
      <h2>Log in to application</h2>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </div>
  )

  const blogsView = () => {
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout </button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={handleBlogUpdate} deleteBlog={handleBlogDeletion} currentUser={user} />
        )}
        <h2>Create new</h2>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogsForm
            createBlog={handleBlogCreation}
          />
        </Togglable>
      </div>
    )}

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

  const blogFormRef = useRef()

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
