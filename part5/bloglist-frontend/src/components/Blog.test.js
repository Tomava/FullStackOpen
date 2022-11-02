import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test writer',
    url: 'test.com',
    likes: 100423,
    user: { name: 'Test creator' },
  }
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()
  const currentUser = ''

  beforeEach(() => {
    render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} currentUser={currentUser} />)
  })

  test('renders only blog title by default', () => {
    screen.getByText('Test blog', { exact: false })

    const nonExistingUrl = screen.queryByText('test.com')
    expect(nonExistingUrl).toBeNull()

    const nonExistingLikes = screen.queryByText('100423')
    expect(nonExistingLikes).toBeNull()
  })

  test('renders more info after clicking the button', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('show')
    await user.click(button)
    screen.getByText('Test blog', { exact: false })
    screen.getByText('Test writer', { exact: false })
    screen.getByText('test.com', { exact: false })
    screen.getByText('100423', { exact: false })
  })

  test('blog can be liked twice', async () => {
    const user = userEvent.setup()

    const button = screen.getByText('show')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})