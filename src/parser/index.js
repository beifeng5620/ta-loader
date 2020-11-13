const { defaultConfig } = require('../config')

const { paramsCommonParser } = require('./common')

/**
 * 参数解析器
 * @description 解析注释
 * @param {String} str 注释文本
 */
const parse = (str) => {
  let values = {}

  /**
   * 解析 log module description
   */
  const reg = [
    /@log (?<log>.+)/i,
    /@module (?<module>.+)/i,
    /@description (?<description>.+)/i
  ]
  reg.forEach((r) => {
    const hasValue = r.exec(str)
    if (hasValue && hasValue.groups) {
      values = { ...values, ...hasValue.groups }
    }
  })

  /**
   * 解析 ignore
   */
  const regForIgnore = /@ignore/i
  const ignoreValue = regForIgnore.exec(str)
  if (ignoreValue) {
    values.ignore = true
  }

  /**
   * 解析 param
   */
  values = paramsCommonParser('param', str, values)

  /**
   * 检验是否含有 '@log'
   */
  if (!values.log) {
    throw new Error('[error] @log 解析失败：错误的使用了 @log 注释')
  }

  values = { ...defaultConfig, ...values }

  return values
}

/**
 * 注释抽取器
 * @param path
 */
const extra = (path) => {
  return [
    path.node.leadingComments,
    path.node.trailingComments,
    path.node.innerComments
  ]
}

/**
 * 参数收集器
 * @description 收集已解析到的参数对象
 * @param {CommentBlock[]} comments
 */
const collector = (comments) => {
  const parserValues = []
  comments.forEach((c) => {
    const obj = parse(c.value)
    parserValues.push(obj)
  })
  return parserValues
}

module.exports = {
  parse,
  extra,
  collector
}
