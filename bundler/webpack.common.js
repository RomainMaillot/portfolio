const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
    devtool: 'source-map',
    entry: './src/index.js',
    output:
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                // Sélectionne tous les fichiers qui se finissent par ces infos (Regex)
                test: /\.(jpg|png|svg|gif)$/,
                // Utilise le loader installé sur tous les fichiers séléctionnés
                use:
                [
                    {
                        loader: 'file-loader',
                        // Creer un dossier au lieu d'avoir l'image à la racine
                        options:
                        {
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            }
        ]
    },
    plugins:
    [
        new CopyWebpackPlugin([ {from: 'static'} ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        })
    ],
}

module.exports = config