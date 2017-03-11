module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-decorators-legacy']
      }
    }, {
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  }
};