import { defineConfig } from 'vitest/config';

import { packageJson } from './vite-content.js';

export default defineConfig({
  define: { SITE_VERSION: JSON.stringify(packageJson.version) },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts', '*.test.ts'],
    setupFiles: ['./tests/setup.ts'],
    restoreMocks: true,
    unstubGlobals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'html', 'lcov'],
      include: ['src/**/*.ts', 'vite-content.ts', 'vite.config.ts', 'vite-*.plugin.ts'],
      exclude: ['src/**/*.d.ts', 'src/**/*.{type,types,interface,interfaces,enum}.ts'],
    },
  },
});
