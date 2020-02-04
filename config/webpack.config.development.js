const webpack = require('webpack');
const Merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = () =>
  Merge(commonConfig, {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
          include: /node_modules/,
        },
      ],
    },
    mode: 'development',
    devServer: {
      port: 3000,
      open: false,
      historyApiFallback: true,
      hot: true,
      overlay: true,
    },
    devtool: 'inline-source-map',
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: 'localhost',
        analyzerPort: 8888,
        openAnalyzer: false,
      }),
      // This fix Maximum call stack size exceeded
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        hash: true,
        inject: true,
        template: './src/index.html',
        preload: ['**/*.*'],
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
      }),
      new webpack.DefinePlugin({
        'process.env.DEV': JSON.stringify(true),
      }),
    ],
  });
