const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'source.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};