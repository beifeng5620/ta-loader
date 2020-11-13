'use strict'

const path = require('path')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const srcBasePath = 'test/src'

module.exports = {
  entry: `./${srcBasePath}/index.js`,
  context: path.resolve(__dirname),
  output: {
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: resolve(srcBasePath),
        exclude: /node_modules/,
        use: [
          {
            loader: './src/index.js',
            options: {}
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve(srcBasePath),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
