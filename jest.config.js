module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@shared/(.*)": "<rootDir>/src/app/shared/$1",
    "@features/(.*)": "<rootDir>/src/app/features/$1",
    "@state/(.*)": "<rootDir>/src/app/state/$1",
  },
  collectCoverage: true,
  coverageReporters: ["html", "text-summary"],
  coverageDirectory: "coverage",
}
