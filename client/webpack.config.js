const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: devMode ? '../css/[name].min.css' : '../css/[name].[contenthash].min.css',
    chunkFilename: devMode ? '../css/[id].min.css' : '../css/[id].[contenthash].min.css',
  }),
];

if (devMode) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  plugins,
  entry: {
    source: './src/app.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      })],
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
};