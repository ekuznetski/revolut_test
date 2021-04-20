module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["./src/jest/test-setup.js"],
  setupFilesAfterEnv: ["./src/jest/setupTests.ts"],
};
