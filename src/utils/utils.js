/**
 * findKeywords
 * method to generate keywords
 *
 * @param {string} [query=''] search string
 * @returns weighted keywords as object
 */
export const findKeywords = (query = '') => {
  if (query === '') return {} // easy exit
  const splitWords = query.split(' ') // split into words array
  let res = {}
  splitWords.forEach((val, index, array) => {
    res = formSentFromIndex(array, index, res)
  })
  return res
}

/**
 * formSentFromIndex
 * util to generate word groups from word array
 *
 * @param {*} array word array
 * @param {*} index staring index
 * @param {*} acc accumulator
 * @returns kw object
 */
export const formSentFromIndex = (array, index, acc) => {
  var sntc
  const sntcObj = acc
  for (let i = index; i < array.length; i++) {
    sntc = sntc ? `${sntc} ${array[i]}` : array[i] // constructing word groups with spaces
    sntcObj[sntc] =
      leastPointList[sntc] || getWeight(i - index + 1, array.length) // progressively storing keyword:weight pair into an object(to avoid another loop)
  }
  return sntcObj
}

const getWeight = (pos, length) => {
  // TODO ?logic? revisit incase if we want some advanced features will look later.
  const factor = length - pos + 1
  return 1 / factor
}

export const getScore = (keywords = {}, summary = {}, id) => {
  // id param is just for debugging
  let score = 0
  var last
  // loop through summary words once
  const smArr = summary.split(' ')

  // DEBUG PURPOSE
  // let combs = []
  // let wrds = []

  // this loop reduces the complexity to N (from N* K old regex method)
  for (const word of smArr) {
    const wrd = word.toLowerCase()
    if (wrd in keywords) {
      score += keywords[wrd] // adding score

      // if the words are contineous add extra points and set last with the new combination
      const combination = `${last} ${wrd}`
      if (last !== undefined && combination in keywords) {
        score += keywords[combination] // along with word score adding combination score
        last = combination
        // combs.push(combination) // debugging
      } else {
        last = wrd
        // wrds.push(wrd) // debugging
      }
    } else {
      // no match clear last wrd
      last = undefined
    }
  }
  return score
}

export const processSummaries = (
  keywords = {},
  summaries = [],
  filteredIdSet,
) => {
  var result = {}
  for (const id of filteredIdSet) {
    const {summary = ''} = summaries[id]
    let score = getScore(keywords, summary, id)
    if (score > 0) result[score] = {...result[score], ...{[id]: summary}}
  }
  return result
}

/**
 * # sortObjToArr
 * sort result object jsut sort the scores in descending order
 * summaries which will have the same score will be clubbed
 *
 * @param {*} [res={}] input result object
 * @returns sorted array with scores only
 */
export const sortObjToArr = (res = {}) =>
  Object.keys(res).sort((a, b) => {
    if (parseFloat(a) < parseFloat(b)) return 1
    else return -1
  })
/**
 * trimResults
 * limit the results and convert the results into required form
 *
 * @param {*} [sortedPts=[]]
 * @param {number} [maxCount=0]
 * @param {*} [result={}]
 * @returns limitted results array
 */
export const trimResults = (
  sortedPts = [],
  maxCount = 0,
  result = {},
  titles = [],
  authors = [],
) => {
  let count = 0
  let results = []
  for (const pt of sortedPts) {
    const ptResult = result[pt] || {}
    for (const [id, val] of Object.entries(ptResult)) {
      if (count >= maxCount) break
      results.push({
        id,
        summary: val,
        pt,
        title: titles[id],
        author: authors[id],
      }) // returning extra parameter pt as the search score
      count++
    }
    if (count >= maxCount) break
  }
  return results
}

export var getResult = (
  keywords,
  summaries,
  maxCount,
  titles = [],
  authors = [],
  filteredIdSet = new Set([]),
) => {
  const result = processSummaries(keywords, summaries, filteredIdSet)
  // sort only the grouped scores, not the entire list
  const sorted = sortObjToArr(result)
  // trim with max number of results, loop will break once the result stack reach the max count
  return trimResults(sorted, maxCount, result, titles, authors)
}
export const searchSummary = (
  keyword = '',
  summaries = [],
  maxCount,
  titles = [],
  authors = [],
  indxdSummaries,
) => {
  const filteredIdSet = filterSummaries(indxdSummaries, keyword)
  const keywords = findKeywords(keyword)
  const result = getResult(
    keywords,
    summaries,
    maxCount,
    titles,
    authors,
    filteredIdSet,
  )
  return result
}

const leastPointList = {
  // giving low ranking points to auxilaries , be forms etc, can be extented with langages
  is: 0.001,
  was: 0.001,
  be: 0.001,
  being: 0.001,
  are: 0.001,
  were: 0.001,
  your: 0.001,
  you: 0.001,
  i: 0.001,
  we: 0.001,
  am: 0.001,
  been: 0.001,
  and: 0.001,
}

/**
 * ## indexSummaries
 * This method will index all sumaries and generate the word index mapper
 * word index mapper is nothing but the js object which contains the words as keys and ids of the summaries which contains the word
 * {
 *  book:new Set([0,1,2...])
 * }
 *
 * Expensive operation should happen on server and keep result on redis or any in memory storage
 * needs to be indexed on every data insertion/updation/deletion
 *
 * @param {*} [summaries=[]] all summaries
 * @returns indexed mapper
 */
export const indexSummaries = (summaries = []) => {
  var mapper = {}
  summaries.forEach((smr = {}) => {
    const {summary = '', id} = smr
    const wordArr = summary.split(' ')
    wordArr.forEach((word = '') => {
      let wrd = word.toLowerCase()
      if (wrd in mapper && mapper[wrd] instanceof Set) {
        mapper[wrd].add(id)
      } else {
        mapper[wrd] = new Set([id])
      }
    })
  })
  return mapper
}

/**
 * ##filterSummaries
 *
 * Method to filter the summaries using the word index mapper
 * word index mapper is nothing but the js object which contains the words as keys and ids of the summaries which contains the word
 * {
 *  book:new Set([0,1,2...]),
 *  is:new Set([0,1,2...])
 * }
 *
 * @param {*} summaries
 * @param {*} [mapper={}]
 * @param {*} keyword
 * @returns
 */
export const filterSummaries = (mapper = {}, keyword = '') => {
  let resultSet = new Set([])
  // only words
  // can thing about removing auxilaries here
  // but we will end up having no result if the user search for "is"
  keyword.split(' ').forEach((key = '') => {
    const kw = key.toLowerCase()
    if (kw in mapper && mapper[kw] instanceof Set) {
      resultSet = new Set([...resultSet, ...mapper[kw]])
    }
  })
  return resultSet
}
