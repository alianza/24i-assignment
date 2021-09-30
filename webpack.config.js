const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      title: '24i Front-End Assignment - Google Search',
      favicon: 'src/assets/favicon.ico',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        description: "Google search page for the 24i coding assignment!",
        theme: "#08b2e3ff",
      },
    }),
  ],
  devServer: {
    watchFiles: ['src/**/*.html', 'src/**/*.js'],
    'static': {
      directory: './dist',
    }
  }
};

module.exports = config;
