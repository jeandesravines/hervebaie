"use strict";

const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const plugins = [
  new LodashModuleReplacementPlugin({
    collections: true
  })
];

const buildPath = __dirname + "/build";
const publicPath = __dirname + "/public";

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: publicPath
    }])
  );
}

module.exports = {
  entry: "./lib/index.js",
  output: {
    path: buildPath,
    filename: "app.js"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    }, {
      test: /\.s?css$/,
      loaders: [
        "style-loader",
        "css-loader?modules&importLoaders=1&camelCase=only",
        "sass-loader"
      ]
    }]
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  },
  devServer: {
    compress: true,
    contentBase: publicPath,
    historyApiFallback: true,
    port: 3000,
    host: "0.0.0.0"
  }
};