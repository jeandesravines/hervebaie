'use strict';

const webpack = require('webpack');
const _ = require('lodash');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const plugins = [
  new LodashModuleReplacementPlugin()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  //plugins.push(new webpack.optimize.UglifyJsPlugin());
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
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.s?css$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
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
