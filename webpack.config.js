module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['es2015', 'stage-1', 'react'],
        plugins: ['transform-decorators-legacy']
      }
    }, {
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true
  }
};