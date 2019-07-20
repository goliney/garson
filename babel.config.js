const path = require('path');

const presets = [
  '@babel/preset-typescript',
  [
    '@babel/env',
    {
      targets: {
        node: '6',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
];

const plugins = ['@babel/plugin-transform-react-jsx'];

module.exports = { presets, plugins };
