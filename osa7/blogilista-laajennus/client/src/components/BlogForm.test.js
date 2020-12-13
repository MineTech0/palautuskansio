import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { act } from 'react-dom/test-utils';
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

jest.mock('../services/blogs')

test('<BlogForm /> creates new blog with content', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm setNotification={jest.fn()} setBlogs={createBlog} blogs={[]} blogFormRef={jest.fn()} />
  )

  const author = component.container.querySelector('input[name="author"]')
  const title = component.container.querySelector('input[name="title"]')
  const url = component.container.querySelector('input[name="Url"]')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'test author' }
  })
  fireEvent.change(title, {
    target: { value: 'test title' }
  })
  fireEvent.change(url, {
    target: { value: 'test url' }
  })
  fireEvent.submit(form)

  expect(blogService.create.mock.calls).toHaveLength(1)
  expect(blogService.create.mock.calls[0][0]).toMatchObject({ author: 'test author', title: 'test title', url: 'test url' })
})