import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Home from '../containers/Home'
import {act} from 'react-dom/test-utils'

describe('renders Home', () => {
  it('should match Snapshot', () => {
    let count = 0
    const {container} = render(<Home />)
    expect(container).toMatchSnapshot()
  })
  it('should render with no value', () => {
    let count = 0
    const testMessage = 'No books Selected'
    const {container, getByText} = render(<Home />)
    expect(container.firstChild.className).toEqual('App')

    // input
    const inputDom = container.querySelector('.c-ac__input')
    expect(inputDom.value).toEqual('')

    // suggestions
    const listDom = container.querySelector('.c-ac__suggestions')
    expect(listDom).toBeNull()

    expect(getByText(testMessage)).toBeInTheDocument()
  })
  it('should render values onChange', async () => {
    let count = 0
    const {container} = render(<Home />)

    expect(container.firstChild.className).toEqual('App')

    // input
    const inputDom = container.querySelector('.c-ac__input')
    expect(inputDom.value).toEqual('')

    // suggestions
    const listDom = container.querySelector('.c-ac__suggestions')
    expect(listDom).toBeNull()

    // input event
    fireEvent.change(inputDom, {
      target: {value: 'is'},
    })
    await act(async () => await sleep(1000)) // debounce time
    expect(inputDom.value).toEqual('is')
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
