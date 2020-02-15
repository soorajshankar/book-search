import assert from 'assert'
import {
  findKeywords,
  getScore,
  getMtchCnt,
  getResult,
  trimResults,
} from '../utils/utils'
import {keywords, data, sortedids, result} from '../testData'

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
// trimResults
describe('#trimResults', () => {
  describe('valid Test1', () => {
    const trimmed = trimResults(sortedids, 3, result)
    it('should have limitted number of results', () => {
      assert.equal(trimmed.length, 3)
    })
    it('should have valid result', () => {
      assert.equal(trimmed[0].id, '0')
      assert.equal(trimmed[1].id, '7')
      assert.equal(trimmed[2].id, '48')
    })
  })
  describe('empty Test', () => {
    const trimmed = trimResults([], 3, {})
    it('should work with empty test', () => {
      assert.equal(trimmed.length, 0)
    })
  })
  describe('invalid Test', () => {
    const trimmed = trimResults([], 3, '{}')
    it('should not break with invalid data', () => {
      assert.equal(trimmed.length, 0)
    })
  })
})

// getResult
describe('#getResult', () => {
  describe('valid Test1', () => {
    const res = getResult(keywords, data.summaries, 3)
    it('should have number of results', () => {
      assert.equal(res.length, 3)
    })
    it('should have valid result', () => {
      assert.equal(res[0].id, '0')
      assert.equal(res[1].id, '7')
      assert.equal(res[2].id, '48')
      assert.equal(res[2].pt, '0.6746666666666666')
      assert.equal(res[1].pt, '0.8393333333333333')
      assert.equal(res[1].summary.length, 341)
    })
  })
  describe('empty Test', () => {
    it('should work with no kws', () => {
      const res = getResult({}, data.summaries, 3)
      assert.equal(res.length, 0)
    })
    it('should work with no summaries', () => {
      const res = getResult(keywords, [], 3)
      assert.equal(res.length, 0)
    })
    it('should work with no inputs', () => {
      const res = getResult({}, [], 3)
      assert.equal(res.length, 0)
    })
  })
})
