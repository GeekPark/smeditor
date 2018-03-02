
const path = require('path')
const config = require('../config')
const webpack = require('webpack')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    entry: {
        main: './src/smeditor.js'
    },
    output: {
        path: path.resolve(__dirname, '../release'),
        publicPath: '/release/',
        filename: 'smeditor.js',
        library: 'smeditor',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/release/vue.esm.js',
          '@': resolve('src'),
        }
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test')]
          }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: config.build.productionSourceMap,
          parallel: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new OptimizeCSSPlugin({
          cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
        }),
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' +
            config.build.productionGzipExtensions.join('|') +
            ')$'
          ),
          threshold: 10240,
          minRatio: 0.8
        }),

        // new BundleAnalyzerPlugin()
    ]
}
