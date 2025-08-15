const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

process.traceDeprecation = true;

module.exports = merge(common, {
  devServer: {
    allowedHosts: 'all',
    client: { overlay: false },
    compress: true,
    historyApiFallback: { disableDotRule: true, index: '/index.html' },
    static: './public',
  },
  devtool: 'inline-source-map',
  infrastructureLogging: { level: 'warn' },
  mode: 'development',
  module: { rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }] },
  output: { filename: '[name].js' },
  plugins: [new ReactRefreshPlugin({ overlay: false })],
});
