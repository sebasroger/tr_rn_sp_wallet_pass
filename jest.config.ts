module.exports = {
  displayName: 'wallet-pass',
  preset: 'react-native',
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  setupFiles: ['./jest/setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '@nx/react-native/plugins/jest/svg-mock',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/../../assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/../../assetsTransformer.js',
  },
  transformIgnorePatterns: [
    '<rootDir>/../../node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|@kichiyaki/react-native-barcode-generator|jsbarcode)',
  ],
};
