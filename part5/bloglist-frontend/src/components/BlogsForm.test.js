import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogsForm from './BlogsForm'

describe('blogs form', () => {
  const createBlog = jest.fn()

  test('blogs form calls the function', async () => {
    const user = userEvent.setup()
    const { container } = render(<BlogsForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#blogTitle-input')
    await user.type(titleInput, 'Test blog')

    const authorInput = container.querySelector('#blogAuthor-input')
    await user.type(authorInput, 'Test writer')

    const urlInput = container.querySelector('#blogUrl-input')
    await user.type(urlInput, 'test.com')

    const submitButton = container.querySelector('#submit-button')
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Test writer')
    expect(createBlog.mock.calls[0][0].url).toBe('test.com')
  })

})