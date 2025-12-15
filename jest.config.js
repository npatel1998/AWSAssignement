const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
   roots: ["<rootDir>/src/test"],
  transform: {
    ...tsJestTransformCfg,
  },
   moduleNameMapper: {
    "^@Tasks/(.*)$": "<rootDir>/src/Tasks/$1",
    "^@Types/(.*)$": "<rootDir>/src/Types/$1"
  }

};