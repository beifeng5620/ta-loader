const fs = require('fs')

const { varType } = require('../utils')

/**
 * 报告生成
 */
const generateReport = (list) => {
  list = list
    .map((i) => {
      // 清除空属性
      return Object.fromEntries(
        Object.entries(i).filter((j) => {
          if (varType(j[1]) === 'Boolean') {
            return true
          }
          return !!j[1].length
        })
      )
    })
    .map((i) => {
      // 定序
      return { log: i.log, ...i }
    })
  // 详细报告
  fs.writeFileSync('./report-detailed.json', JSON.stringify(list, null, 2))

  const simple = []
  list.forEach((i) => {
    if (i.ignore) return
    const obj = { log: i.log }
    if (i.description) {
      obj.desc = i.description
    }
    simple.push(obj)
  })
  // 缩略报告
  fs.writeFileSync('./report-simple.json', JSON.stringify(simple, null, 2))
}

module.exports = {
  generateReport
}
