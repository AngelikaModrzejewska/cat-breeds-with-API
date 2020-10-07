const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',

    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader',
            //     ]
            // },
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // {
                    //     loader: 'resolve-url-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         sourceMap: true,
                    //         plugins: () => [autoprefixer()]
                    //     }
                    // }
                ]
            },
            // Images
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '../img/'
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './index.html' }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/chunks/[id].css'
        })
    ]
};