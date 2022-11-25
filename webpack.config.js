const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true
    },
    entry: './src/js/main.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'RSS Reader',
            template: './index.html'
        })
    ],
    module: {
        rules: [
          {
            test: /\.(scss)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: () => [
                      require('autoprefixer')
                    ]
                  }
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
          }
        ]
    }
};
