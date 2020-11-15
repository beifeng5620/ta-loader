const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const core = require('@babel/core')
const loaderUtils = require('loader-utils')

const {
  commentFilter,
  logCommentFilter,
  repeatFilter
} = require('./utils/filter')

const { extra, collector } = require('./parser')
const { generator } = require('./generator')
const { loaderDefaultConfig } = require('./config')
const { generateReport } = require('./generator/report')

let local = {
  processed: [],
  resolved: []
}

module.exports = function (source, map, meta) {
  let { env, ignore, open, report, ...config } = {
    ...loaderDefaultConfig,
    ...loaderUtils.getOptions(this)
  }

  // open setting
  if (!open) {
    return source
  }

  // env setting
  if (process.env.NODE_ENV && process.env.NODE_ENV !== env) {
    return source
  }

  let ast = parser.parse(source, {
    sourceType: 'module', // 支持 es6 module
    plugins: ['dynamicImport'] // 支持动态 import
  })

  traverse(ast, {
    enter(path) {
      // extra comments
      const positions = extra(path)

      positions.forEach((pos, index) => {
        if (!pos) return

        // filter
        let commentBlocks = logCommentFilter(commentFilter(pos))
        ;[commentBlocks, local.processed] = repeatFilter(
          commentBlocks,
          local.processed
        )

        // parameter collection
        const parserValues = collector(commentBlocks, ignore)

        // parserValues contains special objects
        if (parserValues.length !== 0) {
          // cache
          parserValues.forEach((value) => {
            local.resolved.push({ ...value })
          })

          // add new nodes
          parserValues.forEach((value) => {
            if (value.ignore) return
            const node = generator(value, config)
            switch (index) {
              case 0:
                path.insertBefore(node) // top comment
                break
              case 1:
                path.insertAfter(node) // bottom comment
                break
              case 2:
                path.replaceWithMultiple([node]) // inner comment
                break
            }
          })
        }
      })
    }
  })

  report && generateReport(local.resolved)

  return core.transformFromAstSync(ast, null, {
    configFile: false
  }).code
}
