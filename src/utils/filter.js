const { checkLog } = require('./index')

/**
 * 多行注释过滤器
 * @description 过滤出 CommentBlock （多行注释）
 */
const commentFilter = (comments) => {
  return comments.filter((c) => c.type === 'CommentBlock')
}

/**
 *  log 注解过滤器
 * @description 过滤出符合 '@log' 条件的 comment
 * @param {CommentBlock[]} comments
 */
const logCommentFilter = (comments) => {
  return comments.filter((c) => {
    return checkLog(c.value)
  })
}

/**
 * 重复过滤器
 * @description 过滤掉处理过的
 * @param {CommentBlock[]} comments
 * @param {Array} outputList
 */
const repeatFilter = (comments, outputList) => {
  const result = comments.filter((c) => {
    const notExist = !outputList.some((o) => o.value === c.value)
    if (notExist) {
      outputList.push(c)
      return true
    }
    return false
  })
  return [result, outputList]
}

module.exports = {
  commentFilter,
  logCommentFilter,
  repeatFilter
}
