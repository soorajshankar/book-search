export const getSuggestions = (input = '', queries = []) =>
  queries.filter((item, index) => {
    if (item.toUpperCase().indexOf(input.toUpperCase()) != -1) {
      return true
    }
    return false
  })
