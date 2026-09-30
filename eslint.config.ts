import { configs, globals } from '@simbo/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/dist/', '**/coverage/', '**/docs/']),
  {
    files: ['*.ts'],
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        project: ['./tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    extends: [configs.node.recommended],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        project: ['./tsconfig.browser.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    extends: [configs.browser.recommended],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }]
    }
  }
]) as unknown;
