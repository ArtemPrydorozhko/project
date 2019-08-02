const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtarctPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
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
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtarctPlugin({
            filename: 'css/[name].css'
        })
    ]
}