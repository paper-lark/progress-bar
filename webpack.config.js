/* global __dirname module require */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './source/main.js',
  output: {
    path: `${__dirname}/docs`,
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!ruby-sass-loader?sourceMap'
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
