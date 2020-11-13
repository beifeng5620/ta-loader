/**
 * 检验 log 参数是否存在
 * @param {String} str
 */
const checkLog = (str) => {
  return !!~str.toLowerCase().indexOf('@log ')
}

/**
 * 判断变量类型
 * @param {Object} v
 */
const varType = (v) => {
  return Object.prototype.toString.call(v).slice(8, -1)
}

module.exports = {
  checkLog,
  varType
}
