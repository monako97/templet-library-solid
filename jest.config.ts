import type { Config } from 'jest';

const config: Config = {
  preset: 'PackageNameBySolid',
  coveragePathIgnorePatterns: [],
  testPathIgnorePatterns: [],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts', '<rootDir>/components/index.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/file.mock.ts',
    '\\.(css|less)$': '<rootDir>/test/obj-proxy.ts',
    '\\?raw$': '<rootDir>/test/file.mock.ts',
  },
};

export default config;
