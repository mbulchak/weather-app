module.exports = [
  { ignores: ['dist'] },
  {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      project: './tsconfig.json',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {},
      },
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    rules: {
      'implicit-arrow-linebreak': 0,
      'import/prefer-default-export': 0,
      'max-len': [
        'error',
        {
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
      'no-console': 'warn',
      'no-param-reassign': [2, { props: true }],
      'react/react-in-jsx-scope': 0,
      'react/destructuring-assignment': 0,
      'no-var': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
];
