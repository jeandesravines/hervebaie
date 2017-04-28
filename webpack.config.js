var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');

var plugins = [
  //new LodashModuleReplacementPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.LodashModuleReplacementPlugin());
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

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
      loader: 'babel-loader',
      test: /\.jsx?$/,
      exclude: /node_modules/,
      options: {
        presets: ['es2017', 'stage-0', 'react'],
        plugins: [
          'transform-decorators-legacy',
          'typecheck',
          'lodash'
        ]
      }
    }, {
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    }]
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    compress: true,
    contentBase: './public',
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0'
  }
};