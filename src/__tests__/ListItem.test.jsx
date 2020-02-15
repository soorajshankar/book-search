import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import ListItem from '../components/ListItem'

describe('renders ListItem', () => {
  it('should match Snapshot', () => {
    let count = 0
    const {getByText, container} = render(
      <ListItem author="author" title="title" summary="salkfnalns aslfkn" />,
    )
    expect(container).toMatchSnapshot()
  })
  it('should render with values', () => {
    const {getByText, container} = render(
      <ListItem author="author1" title="title1" summary="summary1" />,
    )
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
