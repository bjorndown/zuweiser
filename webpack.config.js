var path = require('path')

module.exports = {
  entry: './src/gui/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: [['es2015']],
      }
    }]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],

    extensions: ['.js'],
    alias: {
      'vue': 'vue/dist/vue.common.js'
    }
  },
  devtool: 'cheap-eval-source-map'
}