import * as webpack from 'webpack';

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer")
    }
  },
}
