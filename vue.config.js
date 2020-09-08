const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  // publicPath :  '/goal/',
  publicPath :  '/',
  configureWebpack: {
    output: { globalObject: "this" },
    plugins: [
      new CompressionPlugin()
      // new BundleAnalyzerPlugin()
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.ContextReplacementPlugin(
      //   /\.\/locale$/,
      //   "empty-module",
      //   false,
      //   /js$/
      // )
    ]
  },
  devServer: {
    public: "http://127.0.0.1:8082",
    disableHostCheck: true
  }
};
