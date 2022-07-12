import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config';

const prodConfig: Configuration = merge(baseConfig, {
  mode: 'production',
});

export default prodConfig;