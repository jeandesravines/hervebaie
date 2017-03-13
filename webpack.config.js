module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['transform-decorators-legacy']
      }
    }, {
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    }]
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true
  }
};