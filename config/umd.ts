import { type ConfigType, resolveProgram } from 'PackageNameByCore';

const conf: Partial<ConfigType> = {
  devtool: false,
  htmlPluginOption: false,
  entry: resolveProgram('components/index.ts'),
  output: {
    path: resolveProgram('umd'),
    filename: 'index.js',
    library: {
      name: 'libraryNameTemplate',
      type: 'umd',
      umdNamedDefine: true,
    },
  },
  bundleAnalyzer: false,
  splitChunk: false,
  runtimeChunk: false,
};

export default conf;
