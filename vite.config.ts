import { fileURLToPath } from 'node:url';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import htmlMinifier from 'rollup-plugin-html-minifier';
import { defineConfig, Plugin, splitVendorChunkPlugin, UserConfig } from 'vite';
import svgLoader from 'vite-svg-loader';

import packageJson from './package.json';
import links from './src/content/links.json';
import nunjucksPlugin from './vite-nunjucks.plugin';

interface Globals {
  [key: string]: string | boolean | number;
}

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const mode = command === 'build' ? 'production' : 'development';

  const globals: Globals = {
    SITE_VERSION: packageJson.version,
    SITE_LAST_BUILD: new Date().toUTCString(),
    SITE_IS_PROD: mode === 'production',
    SITE_IS_DEV: mode === 'development'
  };

  const config: UserConfig = {
    root: 'src',
    publicDir: 'public',
    mode,
    base: '/',

    build: {
      assetsDir: 'assets',
      outDir: '../dist',
      emptyOutDir: true,
      target: 'es2022',
      sourcemap: true,
      rollupOptions: {
        input: {
          index: fileURLToPath(new URL('src/index.html', import.meta.url))
          // foo: fileURLToPath(new URL('src/foo.html', import.meta.url)) // another page
        },
        plugins: [
          htmlMinifier({
            options: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              preserveLineBreaks: true,
              removeComments: true
            }
          }) as unknown as Plugin
        ]
      }
    },

    plugins: [
      svgLoader({
        defaultImport: 'raw',
        svgo: false
      }),
      nunjucksPlugin({ locals: { ...globals, LINKS: links } }),
      splitVendorChunkPlugin()
    ],

    define: Object.entries(globals).reduce((obj, [key, value]) => {
      if (['string', 'number', 'boolean'].includes(typeof value)) {
        obj[key] = JSON.stringify(value);
      }
      return obj;
    }, {} as Globals),

    css: {
      preprocessorOptions: {
        sass: {
          style: 'expanded',
          sourceMap: true
        }
      },
      transformer: 'postcss',
      postcss: {
        plugins: [autoprefixer({ remove: false }), cssnano({ preset: ['default', { zindex: false }] })]
      },
      devSourcemap: true
    }
  };

  return config;
});
