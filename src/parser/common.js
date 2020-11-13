/**
 * 参数通用解析器
 * @description 提取形如 "@var key value" 的参数
 * @param {String} name 注解名
 * @param {String} str 匹配完整字符串
 * @param {Object} values 参数集
 */
const paramsCommonParser = (name, str, values) => {
  const regForParams = RegExp(`@${name} (.+?) (.+)`, 'gi')
  const regForParam = RegExp(`@${name} (?<key>.+) (?<value>.+)`, 'i')
  const params = str.match(regForParams)
  values[name] = []
  if (params) {
    params.forEach((p) => {
      const obj = { ...regForParam.exec(p).groups }
      values[name].push(obj)
    })
  }
  return values
}

module.exports = {
  paramsCommonParser
}
