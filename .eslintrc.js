module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'warn',
    'no-useless-escape': 'warn',
    'no-control-regex': 'warn',
    'no-empty': 'warn',
    'no-prototype-builtins': 'warn',
    '@typescript-eslint/no-array-constructor': 'warn',
    'use-isnan': 'warn',
    '@typescript-eslint/no-loss-of-precision': 'warn'
  }
}
