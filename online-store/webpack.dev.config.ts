import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config';

const devConfig: Configuration = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
  }
});

export default devConfig;