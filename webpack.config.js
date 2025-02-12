import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: './dist',
    open: true,
    liveReload: true // Ensures auto-reload when files change
  },
  optimization: {
    splitChunks: { chunks: 'all' }
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: { partialDirs: path.resolve(__dirname, 'src/templates/partials') }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        exclude: path.resolve(__dirname, 'src/images')
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'src/images', to: 'images' }] }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.hbs',
      filename: 'index.html',
      templateParameters: {
        title: 'Welcome to My Website',
        heroTitle: 'Bootstrap 5 + Handlebars',
        heroText: 'This is a fully static site generated using Webpack.',
        ctaText: 'Get Started',
        year: new Date().getFullYear()
      }
    }),
    new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' })
  ]
}
