import type { ConfigType } from 'PackageNameByCore';

const CDNHOST = 'https://cdn.statically.io';
const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: `script-src 'self' ${CDNHOST} 'unsafe-eval' 'unsafe-inline' blob:;`,
      },
    },
    tags: [
      {
        tag: 'script',
        src: CDNHOST + '/gh/monako97/cdn/main/npm/%40webcomponents/webcomponentsjs/2.8.0/webcomponents-loader.js',
      },
    ],
  },
  fallbackCompPath: '@/components/fallback',
};

export default conf;
