module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [ "<rootDir>/test/" ],
  moduleNameMapper: { 
    ".s?css": "<rootDir>/test/setup/mock-style.js",
  },
  setupFiles: [
    "<rootDir>/test/setup/setup-react.js",
    "<rootDir>/test/setup/setup-enzyme.js",
   ]
};
