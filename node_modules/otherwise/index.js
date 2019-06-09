'use strict'

const errate = require('errate')
const roadblock = require('roadblock')

module.exports = ({fallback, elseCall, elseReturn = fallback, elseThrow} = {}, defaultErrorClass) => roadblock(elseCall, elseCall, () => {
  if (elseThrow) throw errate(elseThrow, defaultErrorClass, {forceClass: false})
  return elseReturn
})
