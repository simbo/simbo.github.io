import { configs, globals } from '@simbo/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/dist/', '**/coverage/', '**/docs/']),
  {
    files: ['*.ts', 'tests/build.test.ts'],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [configs.node.recommended],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    ignores: ['tests/build.test.ts'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        project: ['./tsconfig.browser.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [configs.browser.recommended],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.test.ts', 'tests/**/*.ts'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'unicorn/no-unsafe-dom-html': 'off',
      'unicorn/prefer-dom-node-html-methods': 'off',
      'unicorn/no-keyword-prefix': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/no-unreadable-new-expression': 'off',
    },
  },
]) as unknown;
