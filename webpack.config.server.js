const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  entry: [path.resolve(__dirname, 'src/server/index.ts')],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/dist/server')
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
    new CleanWebpackPlugin(['build/dist/server'])
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map'
}
