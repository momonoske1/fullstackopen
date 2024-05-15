/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('hidden content', () => {
  const blog = {
    title: 'testing new blog',
    author: 'moad elomari',
    url: 'https://testing.it',
    likes: 2,
    user: {
      id: 'ciao',
    },
  }

  const user = {
    id: 'ciao',
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.hidden')

  expect(div).toHaveTextContent('testing new blog')
})

test('visible content', () => {
  const blog = {
    title: 'testing new blog',
    author: 'moad elomari',
    url: 'https://testing.it',
    likes: 2,
    user: {
      id: 'ciao',
    },
  }

  const user = {
    id: 'ciao',
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  const div = container.querySelector('.visible')

  expect(div).toHaveTextContent('https://testing.it')
  expect(div).toHaveTextContent('2')
})

test('like button clicked twice', async () => {
  const blog = {
    title: 'testing new blog',
    author: 'moad elomari',
    url: 'https://testing.it',
    likes: 2,
    user: {
      id: 'ciao',
    },
  }

  const user = {
    id: 'ciao',
  }

  const mockHandle = jest.fn()

  render(<Blog blog={blog} user={user} addLikes={mockHandle} />)

  const userHandle = userEvent.setup()
  const button = screen.getByText('like')

  await userHandle.click(button)
  await userHandle.click(button)

  expect(mockHandle.mock.calls).toHaveLength(2)

})
