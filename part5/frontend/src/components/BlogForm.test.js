/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm />  updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('.title')
  const authorInput = container.querySelector('.author')
  const urlInput = container.querySelector('.url')
  const createButton = screen.getByText('create')


  await user.type(titleInput, 'testing new blog')
  await user.type(authorInput, 'moad elomari')
  await user.type(urlInput, 'https://testing.it')
  await user.click(createButton)

  const element = createBlog.mock.calls[0][0]

  console.log(element)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(element.title).toBe('testing new blog')
  expect(element.author).toBe('moad elomari')
  expect(element.url).toBe('https://testing.it')
})