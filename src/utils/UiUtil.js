export const getSuggestions = (input = '', queries = []) =>
  queries.filter((item, index) => {
    if (item.toUpperCase().indexOf(input.toUpperCase()) != -1) {
      return true
    }
    return false
  })

// debounce: generic method for autocomplete (alternative to lodash debounce)
export function debounce(func, wait, immediate) {
  var timeout
  return function executedFunction() {
    var context = this
    var args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
