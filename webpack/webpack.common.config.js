const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const PATHS = {
    src: path.join(__dirname, '../src/js/'),
    about: path.join(__dirname, '../src/js/about.js'),
    tut: path.join(__dirname, '../src/js/tut.js'),
    dist: path.join(__dirname, '../dist'),
    test: path.join(__dirname, '../src/'),
}

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const PAGES_DIR = `${PATHS.test}`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))


module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        app: ['babel-polyfill', PATHS.src],
        about: [PATHS.about],
        tut: [PATHS.tut]
    },
    output: {
        filename: `./js/${filename('js')}`,
        path: PATHS.dist,
        publicPath: ''
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [new UglifyJsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-proposal-class-properties', 'transform-regenerator']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    },
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                    ],
                                ],
                            },
                        },
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.pug$/,
                oneOf: [
                    // this applies to <template lang="pug"> in Vue components
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader']
                    },
                    // this applies to pug imports inside JavaScript
                    {
                        use: ['pug-loader']
                    }
                ]
            },
            {
                test: /\.(?:png|svg|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `./img/${filename('[ext]')}`,
                        // esModule: false,
                        //publicPath: '../'
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                        },
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        webp: {
                            quality: 75
                        }
                    }
                }
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '../'
                }
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `src/index.pug`,
            filename: `index.html`,
            chunks: ['app'],
        }),
        new HtmlWebpackPlugin({
            template: `src/about.pug`,
            filename: `about.html`,
            chunks: ['about'],
        }),
        new HtmlWebpackPlugin({
            template: `src/tut.html`,
            filename: `tut.html`,
            chunks: ['tut'],
        }),
        new HtmlWebpackPugPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                },
                            ],
                        },
                    ],
                ],
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.test}/static`, to: `static` },
            ],
        }),
    ],
}