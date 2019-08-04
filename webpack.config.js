const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtarctPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/js/index.js',
        offer: './src/js/offer.js',
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
                        loader :'css-loader'
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.html/,
                use: 'html-loader'
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
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/offer.ejs',
            filename: 'offer.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['offer']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/contacts.ejs',
            filename: 'contacts.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['styles']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/about.ejs',
            filename: 'about.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['styles']
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!./src/html/lot.ejs',
            filename: 'lot.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            chunks: ['styles']
        }),
        new MiniCssExtarctPlugin({
            filename: 'css/[name].css'
        })
    ]
}