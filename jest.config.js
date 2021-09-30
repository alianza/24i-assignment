// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: false,
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules/(?!(http|node-fetch|fetch-blob)/)"],
  setupFilesAfterEnv: ["./jest/setupTests.js"],
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  testPathIgnorePatterns: ['cypress']
};

module.exports = config;
