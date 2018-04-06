const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './src/demo.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'demo.js',
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              use: [
                {
                  loader: path.resolve(__dirname, './loaders/js-loader'),
                  options: {
                    name: 'flow'
                  }
                },
                'babel-loader'
              ],
            },
            {
              test: /\.css$/,
              use: [
                "style-loader",
                "css-loader",
                {
                  loader: path.resolve(__dirname, './loaders/css-loader'),
                  options: {
                    base: 100
                  }
                }
              ]
            },
            {
              test: /\.(png|jpe?g|gif)$/,
              loader: path.resolve(__dirname, './loaders/img-loader')
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      })
    ]
}