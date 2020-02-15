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
    sntcObj[sntc] = getWeight(i - index + 1, array.length) // progressively storing keyword:weight pair into an object(to avoid another loop)
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
  // count all keywords reps K iterartions.
  for (const [kw, weight] of Object.entries(keywords)) {
    const matchCount = getMtchCnt(summary, kw)
    // mutiply with keyword weight
    const adder = matchCount * (leastPointList[kw] || weight)
    score += adder
    // if (id == 40) console.log({ score, matchCount, kw, weight, adder });
  }
  return score
}

export const getRegex = tst => new RegExp(tst, 'gi')
export const getMtchCnt = (txt, kw) =>
  ((txt || '').match(getRegex(kw)) || []).length

export var processSummaries = (keywords = {}, summaries = []) => {
  var result = {}
  summaries.forEach(({summary = '', id}, sIx) => {
    let score = getScore(keywords, summary, id)
    if (score > 0) result[score] = {...result[score], ...{[id]: summary}}
  })
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
export const trimResults = (sortedPts = [], maxCount = 0, result = {}) => {
  let count = 0
  let results = []
  for (const pt of sortedPts) {
    // console.log(pt,result);
    const ptResult = result[pt] || {}
    for (const [id, val] of Object.entries(ptResult)) {
      if (count >= maxCount) break
      results.push({id, summary: val, pt}) // returning extra parameter pt as the search score
      count++
    }
    if (count >= maxCount) break
  }
  return results
}

export var getResult = (keywords, summaries, maxCount) => {
  var result = processSummaries(keywords, summaries)
  // sort only the grouped scores, not the entire list
  var sorted = sortObjToArr(result)
  // trim with max number of results, loop will break once the result stack reach the max count
  return trimResults(sorted, maxCount, result)
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
}
