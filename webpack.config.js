'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const _ = require('lodash');

const plugins = [];
const buildPath = __dirname + '/build';
const publicPath = __dirname + '/public';

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(new CopyWebpackPlugin([{
    from: publicPath
  }]))
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: buildPath,
    filename: 'app.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    compress: true,
    contentBase: publicPath,
    historyApiFallback: true,
    port: 3000,
    host: '0.0.0.0'
  }
};