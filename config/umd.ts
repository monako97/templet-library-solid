import path from 'path';
import { type ConfigType } from 'PackageNameByCore';

const conf: Partial<ConfigType<'swc'>> = {
  devtool: false,
  htmlPluginOption: false,
  entry: path.join(process.cwd(), './components/index.ts'),
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: 'index.js',
    library: {
      name: 'libraryNameTemplate',
      type: 'umd',
      umdNamedDefine: true,
    },
  },
  fixBrowserRouter: false,
  bundleAnalyzer: false,
  externals: [/(.+)\/__tests__\/(.+)/i, /(.+)\/examples\/(.+)/i],
  splitChunk: false,
  runtimeChunk: false,
};

export default conf;
