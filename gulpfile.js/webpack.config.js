var webpack = require('webpack');
var path    = require('path');

module.exports = {
  output: {
    filename: "main.js",
    publicPath: "/assets/js/"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
        jQuery: "jquery"
    })
  ]
}
