/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|expo-modules-core|expo-router|@react-native|react-native|@react-navigation|@rneui|react-native-reanimated)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!app/(tabs)/explore.tsx',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    './app/(tabs)/index.tsx': {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
    './components/hello-animation.tsx': {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};

