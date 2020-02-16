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
  it('should render with no values', () => {
    const testMessage = 'No books Selected'

    const {getByText, container} = render(<BookList list={[]} />)
    expect(container.querySelector('.c-card__title')).toBeNull()
    expect(getByText(testMessage)).toBeInTheDocument()
  })

  it('should render with multiple items', () => {
    let list = [
      {author: {author: 'author1'}, summary: 'summary1', title: 'title1'},
      {author: {author: 'author2'}, summary: 'summary2', title: 'title2'},
    ]
    const {getByTestId, container} = render(<BookList list={list} />)
    const listDom = getByTestId('book_list').children
    expect(listDom.length).toEqual(2)
    expect(container.querySelector('.c-card__title').textContent).toEqual(
      'title1',
    )
    expect(container.querySelector('.c-card__author').textContent).toEqual(
      'author1',
    )
    expect(container.querySelector('.c-card__summary').textContent).toEqual(
      'summary1',
    )
  })
})
