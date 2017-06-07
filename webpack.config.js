'use strict';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;

const plugins = [
  new LodashModuleReplacementPlugin({
    collections: true
  }),
  new PrepackWebpackPlugin({
    test: /src/,
    prepack: {
      logStatistics: true,
      logModules: true,
      trace: true
    }
  })
];

const buildPath = __dirname + '/build';
const publicPath = __dirname + '/public';

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: publicPath
    }])
  );
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