import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    user: 'User 1',
    likes: 1,
    author: 'Writer',
    title: 'Interesting title',
    url: 'Url'
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={{ username:'Mark' }}/>
    )
  })
  test('at start only title and author are displayed', () => {
    const div = component.container.querySelector('.hiddenField')
    expect(div).toHaveStyle('display: none')
  })
  test('after clicking view, url and likes are showed', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.hiddenField')
    expect(div).not.toHaveStyle('display: none')
  })
  test('clicking the like button twice calls event handler twice', () => {

    const button = component.getByText('Like')

    fireEvent.click(button)
    fireEvent.click(button)

    const LikeText = component.container.querySelector('#likeText')
    expect(LikeText).toContainHTML('<p id="likeText">3 <button>Like</button></p>')
  })
})