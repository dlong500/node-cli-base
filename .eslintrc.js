module.exports = {
  "parser": "@babel/eslint-parser",
  "env": {
      "node": true,
      "es2021": true,
  },
  "parserOptions": {
    // "ecmaVersion": 12, // set automatically by es2021 env
    "sourceType": "module",
  },
  "extends": [ "eslint:recommended", "plugin:import/errors" ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": 1,
    "comma-dangle": [1, "always-multiline"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": false, "optionalDependencies": false, "peerDependencies": false}],
    "require-await": "warn",
  },
  "globals": {
    "__ENVIRONMENT__": true,
    "__PLATFORM__": true,
  },
}