const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    '/': path.resolve(__dirname, 'src/client/index.ts')
  },
  target: 'web',
  output: {
    filename: '[name]index.js',
    path: path.resolve(__dirname, 'build/dist/client')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            babelCore: '@babel/core',
            babelOptions: {
              babelrc: true
            }
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'src/client'), ignore: ['*.ts'] }]),
    new CleanWebpackPlugin(['build/dist/client/index.js'])
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map'
}
