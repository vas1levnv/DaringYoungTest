const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new CssMinimizerWebpackPlugin()
        ]
    }
    return config
}



module.exports = {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        open: true,
        port: 'auto',
        static: {
            directory: './src',
            watch: true
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/img/worldwide.svg'),
                    to: path.resolve(__dirname, 'dist'),
                    noErrorOnMissing: true
                },
               {
                    from: path.resolve(__dirname, 'src/assets/img/paginationGreen.svg'),
                    to: path.resolve(__dirname, 'dist'),
                    noErrorOnMissing: true
                }, {
                    from: path.resolve(__dirname, 'src/assets/img/graduated1.svg'),
                    to: path.resolve(__dirname, 'dist'),
                    noErrorOnMissing: true
                }, {
                    from: path.resolve(__dirname, 'src/assets/img/growth1.svg'),
                    to: path.resolve(__dirname, 'dist'),
                    noErrorOnMissing: true
                }, {
                    from: path.resolve(__dirname, 'src/assets/img/development1.svg'),
                    to: path.resolve(__dirname, 'dist'),
                    noErrorOnMissing: true
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/i,
                type: "asset/resource"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
}