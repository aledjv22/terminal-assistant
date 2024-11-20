import { singleQuote, semi, tabWidth } from './prettier.config.js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'prettier/prettier': [
        'error',
        {
          singleQuote,
          semi,
          tabWidth,
        },
      ],
    },
  },
];
