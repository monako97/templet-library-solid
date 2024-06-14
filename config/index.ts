import type { ConfigType } from 'PackageNameByCore';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      },
    },
    tags: [
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/%40webcomponents/webcomponentsjs/2.8.0/webcomponents-loader.js',
      },
    ],
  },
  fallbackCompPath: '@/components/fallback',
  importOnDemand: {
    lodash: {
      transform: '${member}',
    },
  },
};

export default conf;
