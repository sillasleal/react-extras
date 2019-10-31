module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "no-unused-vars": 0,
    "require-jsdoc": [0, {
        "ignore":
            {
              "render": true,
              "constructor": true,
              "componentDidMount": true,
              componentWillUnmount: true,
              componentDidUpdate: true
            }
      }
    ]
  }
};
