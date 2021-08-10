module.exports = {
  env: {
    jest: true,
    browser:true,
    node:true,
    es2021: true,
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
  },
}
