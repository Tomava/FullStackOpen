import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(displayNotification(`You created '${content}'`))
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm