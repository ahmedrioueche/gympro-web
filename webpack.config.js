const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url/'),
      util: require.resolve('util/'),
      child_process: false,
      crypto: require.resolve('crypto-browserify'), // Optional: add crypto polyfill if needed
      stream: require.resolve('stream-browserify'), // Optional: stream polyfill
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env), // Optional: pass environment variables
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
};
