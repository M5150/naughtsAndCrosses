var webpack = require('webpack');

module.exports = {
  entry: [
    './src/components/index.jsx',
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:['es2015', 'react'],
        },
      },
    ],
  },
  devServer: {
    contentBase: './src',
    hot: true,
  },
  output: {
    filename: './src/assets/bundle.js',
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
  },
};
