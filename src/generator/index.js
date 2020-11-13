const t = require('@babel/types')

/**
 * 语句生成器
 * @param parserValue 解析后的参数对象
 */
const generator = (parserValue, config) => {
  const { __INSTANCE_NAME__, __FUNC_NAME__, __DEFAULT_PARAM__ } = config

  const paramsStatements = []

  parserValue.param.forEach((obj) => {
    paramsStatements.push(
      t.objectProperty(
        t.identifier(obj.key),
        obj.value.indexOf('$') === 0
          ? t.identifier(obj.value.slice(1))
          : t.stringLiteral(obj.value),
        false,
        false
      )
    )
  })

  const statement = t.expressionStatement(
    t.callExpression(
      t.memberExpression(
        t.identifier(__INSTANCE_NAME__),
        t.identifier(__FUNC_NAME__),
        false
      ),
      [
        t.objectExpression([
          t.objectProperty(
            t.identifier(__DEFAULT_PARAM__),
            t.stringLiteral(parserValue.log),
            false,
            false
          ),
          ...paramsStatements
        ])
      ]
    )
  )

  return statement
}

module.exports = {
  generator
}
