/* eslint-disable import/no-extraneous-dependencies */
import styleGuide from 'eslint-config-standard';

export default [
  ...[].concat(styleGuide),
  {
    files: ['**/*.js'],
    plugins: {
      styleGuide,
    },
    rules: {
      'no-console': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
          message: 'Unexpected property on console object was called',
        },
      ],
    },
  },
];
