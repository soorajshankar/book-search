import assert from 'assert'
import {findKeywords, getScore, getMtchCnt} from '../utils/utils'
import {keywords, data} from '../testData'

// findKeywords
describe('#findKeywords', () => {
  describe('valid Test1', () => {
    const kwrds = findKeywords('is your problems')
    it('should have valid results', () => {
      assert.equal(kwrds['is'], 0.3333333333333333)
      assert.equal(kwrds['is your'], 0.5)
      assert.equal(kwrds['is your problems'], 1)
    })
    it('should have full number of results', () => {
      assert.equal(Object.keys(kwrds).length, 6)
    })
  })
  describe('valid Test2 big query', () => {
    const kwrds = findKeywords('is your problems related to books')
    it('should have valid results', () => {
      assert.equal(kwrds['is'], 0.16666666666666666)
      assert.equal(kwrds['is your'], 0.2)
      assert.equal(kwrds['is your problems'], 0.25)
      assert.equal(kwrds['is your problems related to books'], 1)
    })
    it('should have full number of results', () => {
      assert.equal(Object.keys(kwrds).length, 21)
    })
  })
  describe('invalid Test', () => {
    it('should respond to invalid inputs with empty object', () => {
      const kwrds = findKeywords('')
      assert.equal(Object.keys(kwrds).length, 0)
    })
  })
})

// getScore
describe('#getScore', () => {
  describe('valid Test1', () => {
    const score = getScore(keywords, data.summaries[10].summary)
    it('should have valid score', () => {
      assert.equal(score, 0.001)
    })
  })
  describe('valid Test2 big query', () => {
    const score = getScore(keywords, data.summaries[44].summary)
    it('should have valid results', () => {
      assert.equal(score, 0.004)
    })
  })
  describe('invalid Test', () => {
    it('should respond to invalid summary', () => {
      const score = getScore(keywords, '')
      assert.equal(score, 0)
    })
    it('should respond to invalid kw', () => {
      const score = getScore({}, data.summaries[3].summary)
      assert.equal(score, 0)
    })
  })
})

// getMtchCnt
describe('#getMtchCnt', () => {
  describe('valid Test1', () => {
    const score = getMtchCnt(data.summaries[12].summary, 'is')
    it('should have valid score', () => {
      assert.equal(score, 1)
    })
  })
  describe('valid Test2', () => {
    const score = getMtchCnt(data.summaries[12].summary, 'book')
    it('should have valid score', () => {
      assert.equal(score, 1)
    })
  })
  describe('invalid Test', () => {
    const score = getMtchCnt(data.summaries[12].summary, 'is book')
    it('should have valid score', () => {
      assert.equal(score, 0)
    })
  })
})
