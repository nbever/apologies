const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: './web/index.js',
    worker: './web/worker.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'web', 'dist'),
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'web', 'dist')
    },
    compress: true,
    port: 9000,
    historyApiFallback: {
      rewrites: [
        { from: /.*main.js/, to: '/main.js' },
        { from: /.*/, to: '/' }
      ]
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Apologies',
      favicon: path.resolve(__dirname, 'web', 'images', 'pawn.png'),
      template: path.resolve(__dirname, 'web/index.html')
    }),
    new CopyPlugin({
      patterns: [
        {from: './manifest.json', to: path.resolve(__dirname, 'web', 'dist')}
      ],
    })
  ],
};
