// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  "no-shadow": ["error", { "allow": ["state"] }],
  "no-param-reassign": ["error", {
    "props": true,
    "ignorePropertyModificationsFor": [ // All properties except state are in the ignorePropertyModificationsFor array by default.
      "state",
      "acc",
      "e",
      "ctx",
      "req",
      "request",
      "res",
      "response",
      "$scope"
    ]
  }]
}

