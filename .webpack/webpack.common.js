const HtmlWebpackPlugin = require('html-webpack-plugin');
const { defineReactCompilerLoaderOption, reactCompilerLoader } = require('react-compiler-webpack');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader', { loader: reactCompilerLoader, options: defineReactCompilerLoaderOption({}) }],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name(module) {
            if (module.context) {
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (match) {
                const packageName = match[1];
                return `npm.${packageName.replace('@', '')}`;
              }
            }
            return 'vendor';
          },
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  output: { clean: true, crossOriginLoading: 'anonymous', publicPath: '/' },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new SubresourceIntegrityPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.mjs'],
    fallback: {
      path: require.resolve('path-browserify'),
    },
  },
};