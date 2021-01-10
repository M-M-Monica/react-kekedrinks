// const path = require('path');
// const htmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common.js')

const devConfig = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './favicon.ico'
    })
  ],
  mode: 'development',
  devServer: {
    port: 8800,
    hot: true,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/' : {
        target: 'http://localhost:3000',
        changeOrigin : true
      }
    }
  }
}

module.exports = merge(commonConfig, devConfig)