const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtarctPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js',
        offer: './src/js/offer.js',
        lot: './src/js/lot.js',
        common: './src/js/common.js',
        register: './src/js/register.js',
        login: './src/js/login.js',
        createLot: './src/js/createLot.js',
        user: './src/js/user.js',
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
                        loader :'css-loader'
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: ['/node_modules/', 'server.js', '/routes/', '/models']
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
            chunks: ['main', 'common']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/offer.ejs',
            filename: 'offer.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['offer', 'common']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/contacts.ejs',
            filename: 'contacts.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/about.ejs',
            filename: 'about.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/lot.ejs',
            filename: 'views/lot.ejs',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['lot', 'common']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/createLot.ejs',
            filename: 'createLot.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'createLot']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/register.ejs',
            filename: 'register.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common','register']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/login.ejs',
            filename: 'login.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'login']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/user.ejs',
            filename: 'views/user.ejs',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['common', 'user']
        }),
        new MiniCssExtarctPlugin({
            filename: 'css/[name].css'
        })
    ]
}