const { merge } = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({ filename: 'css/styles.css' })
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /(react|react-dom|react-router-dom|antd|axios)/,
          chunks: 'all',
          priority: -10
        }
      }
    }
  },
  mode: 'production'
}

module.exports = merge(commonConfig, prodConfig)