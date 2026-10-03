import { fileURLToPath } from 'node:url';

import autoprefixer from 'autoprefixer';
import { defineConfig, type UserConfig } from 'vite';

import { links, packageJson } from './vite-content.js';
import { htmlMinifierPlugin } from './vite-html-minifier.plugin.js';
import nunjucksPlugin from './vite-nunjucks.plugin.js';

type Globals = Record<string, string | boolean | number>;

const AUTHOR_FIRST_NAME = 'Simon';
const AUTHOR_LAST_NAME = 'Lepel';
const AUTHOR_NAME = `${AUTHOR_FIRST_NAME} ${AUTHOR_LAST_NAME}`;
const AUTHOR_USER = 'simbo';
const SITE_TITLE = "Simbo's Website";
const SITE_DESCRIPTION = `Personal Website of ${AUTHOR_NAME} alias ${AUTHOR_USER}`;
const SITE_URL = 'https://simbo.de/';
const SITE_LICENSE = `MIT © 2018 ${AUTHOR_NAME}`;

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const mode = command === 'build' ? 'production' : 'development';
  const date = new Date();

  const globals: Globals = {
    SITE_VERSION: packageJson.version ?? 'N/A',
    SITE_LAST_BUILD: date.toUTCString(),
    SITE_IS_PROD: mode === 'production',
    SITE_IS_DEV: mode === 'development',
    SITE_TITLE,
    SITE_DESCRIPTION,
    SITE_URL,
    SITE_LICENSE,
    AUTHOR_FIRST_NAME,
    AUTHOR_LAST_NAME,
    AUTHOR_NAME,
    AUTHOR_USER,
  };

  const config: UserConfig = {
    appType: 'mpa',
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
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [{ name: 'vendor', test: /[\\/]node_modules[\\/]/ }],
          },
        },
        input: {
          index: fileURLToPath(new URL('src/index.html', import.meta.url)),
          // foo: fileURLToPath(new URL('src/foo.html', import.meta.url)) // another page
        },
      },
    },

    plugins: [nunjucksPlugin({ locals: { ...globals, LINKS: links } }), htmlMinifierPlugin()],

    define: Object.entries(globals).reduce<Globals>((obj, [key, value]) => {
      if (['string', 'number', 'boolean'].includes(typeof value)) {
        obj[key] = JSON.stringify(value);
      }
      return obj;
    }, {}),

    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('src/styles', import.meta.url))],
          style: 'expanded',
        },
      },
      transformer: 'postcss',
      postcss: {
        plugins: [autoprefixer({ remove: false })],
      },
      devSourcemap: true,
    },
  };

  return config;
});
