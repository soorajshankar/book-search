import assert from 'assert'
import {getSuggestions} from '../utils/UiUtil'
import {data} from '../testData'

// getSuggestions
describe('#getSuggestions', () => {
  describe('valid Test1', () => {
    const suggestions = getSuggestions('book', data.queries)
    it('should n results', () => {
      assert.equal(suggestions.length, 7)
    })
    it('should have valid results', () => {
      assert.equal(suggestions[0], 'achieve take book')
      assert.equal(suggestions[6], 'practice the book')
    })
  })
  describe('valid Test1', () => {
    const suggestions = getSuggestions('is', data.queries)
    it('should n results', () => {
      assert.equal(suggestions.length, 9)
    })
    it('should have valid results', () => {
      assert.equal(suggestions[0], 'is your problems')
      assert.equal(suggestions[6], 'a is gift')
    })
  })

  describe('invalid Test', () => {
    it('should respond to invalid inputs with empty object', () => {
      const suggestions = getSuggestions('')
      assert.equal(Object.keys(suggestions).length, 0)
    })
  })
})
