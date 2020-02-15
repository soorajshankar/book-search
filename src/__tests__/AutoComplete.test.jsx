import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import AutoComplete from '../components/AutoComplete'

function Counter() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  )
}

describe('renders AutoComplete', () => {
  it('should match Snapshot', () => {
    let count = 0
    const {getByText, container} = render(
      <AutoComplete value="test" onSelect={() => count++} />,
    )
    expect(container).toMatchSnapshot()
  })
  it('should render with value', () => {
    let count = 0
    const {getByText, container} = render(
      <AutoComplete value="test" onSelect={() => count++} />,
    )
    expect(container.firstChild.className).toEqual('c-ac')
    expect(container.lastChild.className).toEqual('c-ac')
  })
  it('should respond to events', () => {
    let count = 0
    const {getByText, container} = render(
      <AutoComplete value="test" onSelect={() => count++} />,
    )
    const button = container.querySelector('.c-suggestions__item')
    fireEvent.click(button.firstChild)
    fireEvent.click(button.firstChild)
    expect(count).toEqual(2)
  })
})
