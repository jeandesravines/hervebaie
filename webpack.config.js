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
        presets: ['react', 'es2015', 'stage-1'],
        plugins: [
          'transform-decorators-legacy',
          'typecheck'
        ]
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
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true
  }
};