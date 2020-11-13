const __INSTANCE_NAME__ = 'TA'
const __FUNC_NAME__ = 'log'
const __DEFAULT_PARAM__ = 'id'

const loaderDefaultConfig = {
  env: 'production',
  ignore: [],
  open: true,
  report: true,
  __INSTANCE_NAME__,
  __FUNC_NAME__,
  __DEFAULT_PARAM__
}

const defaultConfig = {
  module: '',
  description: '',
  ignore: false,
  param: []
}

module.exports = {
  defaultConfig,
  loaderDefaultConfig
}
