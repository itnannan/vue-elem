// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent':0,
    'beforeColon': 0,
    'afterColon':0,
    'space-before-function-paren':0,
    'space-before-blocks':0,
    'comma-spacing':0,
    'key-spacing':0,
    'space-infix-ops':0,
    'semi':0,
    'semi-spacing':0,
    'eol-last':0,
    'no-whitespace-before-property':0,
    'keyword-spacing':0,
    'no-undef':0,
    'arrow-spacing':0,
    'space-in-parens':0,
    'no-trailing-spaces':0,
    'no-unused-vars':0
  }
}
