/* global __dirname */
/* global module */

module.exports = {
  entry: './source/main.js',
  output: {
    path: `${__dirname}/docs`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!ruby-sass-loader?sourceMap'
      }
    ]
  }
};
