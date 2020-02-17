import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import AutoComplete from '../components/AutoComplete'

describe('renders AutoComplete', () => {
  it('should match Snapshot', () => {
    let count = 0
    const {container} = render(
      <AutoComplete
        value="test"
        suggestions={[{title: 'test'}, {title: 'test2'}]}
        onSelect={() => count++}
      />,
    )
    expect(container).toMatchSnapshot()
  })
  it('should render with values and suggestions', () => {
    let count = 0
    const {container} = render(
      <AutoComplete
        value="test"
        suggestions={[{title: 'test'}, {title: 'test2'}]}
        onSelect={() => count++}
      />,
    )
    expect(container.firstChild.className).toEqual('c-ac')
    expect(container.lastChild.className).toEqual('c-ac')

    // input
    const inputDom = container.querySelector('.c-ac__input')
    expect(inputDom.value).toEqual('test')

    // suggestions
    const listDom = container.querySelector('.c-ac__suggestions')
    expect(listDom.childNodes.length).toEqual(2)
    expect(listDom.firstChild.textContent).toEqual('test')
    expect(listDom.childNodes[1].textContent).toEqual('test2')
  })
  it('should render with no value', () => {
    let count = 0
    const {container} = render(
      <AutoComplete value="" suggestions={[]} onSelect={() => count++} />,
    )
    expect(container.firstChild.className).toEqual('c-ac')
    expect(container.lastChild.className).toEqual('c-ac')
    // input
    const inputDom = container.querySelector('.c-ac__input')
    expect(inputDom.value).toEqual('')

    // suggestions
    const listDom = container.querySelector('.c-ac__suggestions')
    expect(listDom).toBeNull()
  })
  it('should respond to UI events', () => {
    let count = [] //simple hack to replace jest.jn mock
    let value = '' //simple hack to replace jest.jn mock
    const {container} = render(
      <AutoComplete
        value="test"
        suggestions={[{title: 'test'}, {title: 'test2'}]}
        onSelect={d => count.push(d)}
        onChange={e => (value = e)}
      />,
    )
    // suggestions select event
    const button = container.querySelector('.c-suggestions__item')
    fireEvent.click(button.firstChild)
    fireEvent.click(button.firstChild)
    expect(count.length).toEqual(2)

    // input event
    const inputDom = container.querySelector('.c-ac__input')
    fireEvent.change(inputDom, {
      target: {value: 'testdata'},
    })
    // make sure inner component is changed
    expect(inputDom.value).toEqual('testdata')
    // make sure it called onChange prop method (here it will set the variable `value`)
    expect(value).toEqual('testdata')
  })
  it('should rerender with new data and it should be ready for the new events', () => {
    let count = [] //simple hack to replace jest.jn mock
    let value = '' //simple hack to replace jest.jn mock
    const {container, rerender} = render(
      <AutoComplete
        value="test"
        suggestions={[{title: 'test'}, {title: 'test2'}]}
        onSelect={d => count.push(d)}
        onChange={e => (value = e)}
      />,
    )
    // suggestions select event
    const button = container.querySelector('.c-suggestions__item')
    fireEvent.click(button.firstChild)
    fireEvent.click(button.firstChild)
    expect(count.length).toEqual(2)

    // input event
    const inputDom = container.querySelector('.c-ac__input')
    fireEvent.change(inputDom, {
      target: {value: 'testdata'},
    })
    // make sure inner component is changed
    expect(inputDom.value).toEqual('testdata')
    // make sure it called onChange prop method (here it will set the variable `value`)
    expect(value).toEqual('testdata')

    rerender(
      <AutoComplete
        value="rere"
        suggestions={[{title: 'rere'}, {title: 'rere2'}, {title: 'rere3'}]}
        onSelect={d => count.push(d)}
        onChange={e => (value = e)}
      />,
    )

    // input
    // const inputDom = container.querySelector('.c-ac__input')
    expect(inputDom.value).toEqual('rere')

    // suggestions
    const listDom = container.querySelector('.c-ac__suggestions')
    expect(listDom.childNodes.length).toEqual(3)
    expect(listDom.firstChild.textContent).toEqual('rere')
    expect(listDom.childNodes[1].textContent).toEqual('rere2')
    expect(listDom.childNodes[2].textContent).toEqual('rere3')

    // suggestions select event
    fireEvent.click(button.firstChild)
    fireEvent.click(button.firstChild)
    expect(count.length).toEqual(4)

    // input event
    fireEvent.change(inputDom, {
      target: {value: 'testdata2'},
    })
    // make sure inner component is changed
    expect(inputDom.value).toEqual('testdata2')
    // make sure it called onChange prop method (here it will set the variable `value`)
    expect(value).toEqual('testdata2')
  })
})
