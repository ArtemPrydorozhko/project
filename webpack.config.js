const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtarctPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js',
        offer: './src/js/offer.js',
        lot: './src/js/lot.js',
        common: ['babel-polyfill','./src/js/common.js'],
        register: './src/js/register.js',
        login: './src/js/login.js',
        createLot: './src/js/createLot.js',
        user: './src/js/user.js',
        styles: './src/js/styles.js'
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtarctPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    'sass-loader'
                ]
            },
            // {
            //     test: /\.js$/,
            //     exclude: ['/node_modules/', '/server.js', '/routes/', '/models/', '/src/js/styles.js'],
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 [
            //                     '@babel/preset-env',
            //                     {
            //                         targets: {
            //                             ie: "11"
            //                         },
            //                         useBuiltIns: "usage"
            //                     }
            //                 ]
            //             ]
            //         }
            //     },   
            // },
            {
                test: /\.js$/,
                exclude: ['/node_modules/', '/server.js', '/routes/', '/models/'],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: '/img/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/index.ejs',
            filename: 'views/index.ejs',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common','main',  'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/offer.ejs',
            filename: 'offer.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common','offer',  'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/contacts.ejs',
            filename: 'contacts.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/about.ejs',
            filename: 'about.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/lot.ejs',
            filename: 'views/lot.ejs',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common','lot',  'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/createLot.ejs',
            filename: 'createLot.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'createLot', 'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/register.ejs',
            filename: 'register.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'register', 'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/login.ejs',
            filename: 'login.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'login', 'styles'],
            chunksSortMode: 'none'
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/user.ejs',
            filename: 'views/user.ejs',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'user', 'styles'],
            chunksSortMode: 'none'
        }),
        new MiniCssExtarctPlugin({
            filename: 'css/[name].css'
        })
    ]
}