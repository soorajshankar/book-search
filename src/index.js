import React from 'react'
import ReactDOM from 'react-dom'
import {findKeywords, getResult} from './utils/utils'
import {data} from './utils/data'
const {summaries} = data

// NOTE: now this file is just used for easy utils debugging no UI development is done here.
// just to leverage Chrome debugger.

function App() {
  const keywords = findKeywords('is your problems')
  console.debug(keywords)
  const result = getResult(keywords, summaries, 3)
  console.log(result)
  return 'TT'
}

ReactDOM.render(<App />, document.getElementById('root'))
