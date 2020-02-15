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
