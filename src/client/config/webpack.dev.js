const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  name: 'client',
  devtool: 'cheap-module-source-map',
  mode: 'development',
  target: 'web',
  context: path.resolve(__dirname, '..'),
  entry: path.resolve(__dirname, '../index.js'),
  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: '[name].bundle.js',
  },
  watch: true,
  watchOptions: {
    poll: true,
    aggregateTimeout: 300,
    ignored: [/node_modules/, /__tests__/],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Inclusive Harvard Mapping',
      inject: true,
    }),
  ],
};
