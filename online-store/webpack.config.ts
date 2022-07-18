import path from 'path';
import { Configuration } from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export const baseConfig: Configuration = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/i,
        use: 'source-map-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'boundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new ESLintPlugin({extensions: ['.tsx', '.ts', '.js']}),
    new HtmlWebpackPlugin(
      {
        title: 'Online Store - Men Shoes',
        template: './src/main.html',
      }
    ),
    new CopyPlugin({
      patterns: [
        { from: './src/assets', to: './dist/assets' }
      ]
    })
  ],
};