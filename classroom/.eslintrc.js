module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "space-before-function-paren": "off",
    "no-unused-vars": "off",
    "camelcase": "off",
    "no-tabs": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-useless-constructor": "off",
    "space-in-brackets": "off",
    "eslint/prettier/prettier": "off",
    "prettier/prettier": ["off", {
      "singleQuote": false,
      "trailingComma": "all",
      "bracketSpacing": false
    }]

  },
};
