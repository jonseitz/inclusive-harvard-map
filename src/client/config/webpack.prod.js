const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  name: 'client',
  devtool: false,
  mode: 'production',
  target: 'web',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: path.resolve(__dirname, '../index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(woff2?|png|jpg|gif|svg)$/,
        use: [{ loader: 'file-loader' }],
      },
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
            plugins: ['syntax-dynamic-import'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Inclusive Harvard Mapping',
      template: './config/template.html',
      inject: true,
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      exclude: [
        '/api/floors',
      ],
      runtimeCaching: [
        {
          urlPattern: /\.png/,
          handler: 'cacheFirst',
          options: {
            expiration: {
              maxEntries: 6,
              maxAgeSeconds: 60 * 60 * 24,
            },
            cacheName: 'images',
          },
        },
        {
          urlPattern: /\/api\/floors\//,
          handler: 'cacheFirst',
          options: {
            expiration: {
              maxEntries: 6,
              maxAgeSeconds: 60 * 60 * 24,
            },
            cacheName: 'floors',
          },
        },

      ],
    }),
  ],
};
