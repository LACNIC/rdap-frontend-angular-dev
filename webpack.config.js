// var webpack = require("webpack");
// const path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var PROD = 0;
//
//
// module.exports = {
//     entry: "./src/main",
//     output: {
//         path: path.resolve(__dirname, './src/dist'),
//         filename: PROD ? '[name].bundle.min.js' : '[name].bundle.js'
//     },
//     resolve: {
//         extensions: [".js", ".json", ".jsx", ".css"]
//     },
//     devtool: 'source-map',
//     module: {
//         rules: [
//             {
//                 test: /\.ts/, use: 'ts-loader',
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     plugins: [PROD ? new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
//         : (new webpack.optimize.CommonsChunkPlugin({
//             name: "vendor"
//
//         }), new HtmlWebpackPlugin({
//             template: 'src/index.html',
//             inject: 'body',
//             hash: true
//         })),
//     ],
//
//     devServer: {
//         contentBase: path.join(__dirname, "./src"),
//         historyApiFallback: {
//             disableDotRule: true
//         },
//         port: 3000
//
//
//     }
//
//
// }

module.exports = require('./config/webpack.dev.js');