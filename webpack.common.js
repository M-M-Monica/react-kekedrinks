const path = require('path');

const commonConfig = {
  entry: {
    app: './src/app.jsx'
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=5000&name=img/[name].[ext]' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader?limit=5000&name=resource/[name].[ext]' }, 
      { test: /\.jsx$/, use: 'babel-loader', exclude: /(node_modules)/ }
    ]
  }
}

module.exports = commonConfig