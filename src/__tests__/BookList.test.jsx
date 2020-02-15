import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import BookList from '../components/BookList'

describe('renders BookList', () => {
  it('should match Snapshot', () => {
    let list = [
      {author: {author: 'author1'}, summary: 'summary1', title: 'title'},
    ]
    const {getByText, container} = render(<BookList list={list} />)
    expect(container).toMatchSnapshot()
  })
  it('should render with values', () => {
    let list = [
      {author: {author: 'author1'}, summary: 'summary1', title: 'title'},
    ]
    const {getByText, container} = render(<BookList list={list} />)
    expect(container.querySelector('.c-card__title').textContent).toEqual(
      'title',
    )
    expect(container.querySelector('.c-card__author').textContent).toEqual(
      'author1',
    )
    expect(container.querySelector('.c-card__summary').textContent).toEqual(
      'summary1',
    )
  })
})
