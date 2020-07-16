module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    "jsx-a11y/label-has-associated-control": [ "error", {
      "required": {
        "some": [ "nesting", "id"  ]
      }
    }],
    'react/button-has-type': 'off',
    'react/jsx-props-no-spreading': 'off',
    'camelcase': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-filename-extension': 'off',
    'no-useless-escape': 'off',
  },
};
