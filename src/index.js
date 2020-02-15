import React from 'react'
import ReactDOM from 'react-dom'
import {findKeywords} from './utils/utils'

// NOTE: now this file is just used for easy utils debugging no UI development is done here.
// just to leverage Chrome debugger.

function App() {
  const keywords = findKeywords('is your problems')
  console.debug(keywords)
  return JSON.stringify(keywords)
}

ReactDOM.render(<App />, document.getElementById('root'))
