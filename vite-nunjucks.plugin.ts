import { readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { cwd } from 'node:process';

import { ConfigureOptions, Environment } from 'nunjucks';
import { HmrContext, IndexHtmlTransformContext, IndexHtmlTransformResult, Plugin } from 'vite';

export interface NunjucksPluginOptions {
  locals: object; // nunjucks template variables
}

const srcPath = resolve(cwd(), 'src');

const nunjucksOptions: ConfigureOptions = {
  autoescape: true,
  lstripBlocks: true,
  noCache: true,
  throwOnUndefined: true,
  trimBlocks: true
};

const nunjucksEnvironment = new Environment(
  {
    async: true,
    getSource: (name, callback) => {
      const path = resolve(srcPath, name);
      readFile(path)
        .then(src => callback(undefined, { src: src.toString(), path, noCache: !!nunjucksOptions.noCache }))
        .catch(error => (callback as (error: Error) => void)(error));
    }
  },
  nunjucksOptions
);

export default (options: Partial<NunjucksPluginOptions> = {}): Plugin => {
  const locals: object = options.locals ?? {};
  return {
    name: 'nunjucks',
    enforce: 'pre',
    handleHotUpdate: (context: HmrContext): void | [] => {
      const filename = resolve(context.file);
      if (!filename.startsWith(srcPath)) return;
      context.server.ws.send({ type: 'full-reload' });
      return [];
    },
    transformIndexHtml: {
      enforce: 'pre',
      transform: async (html: string, context: IndexHtmlTransformContext): Promise<IndexHtmlTransformResult | void> =>
        new Promise((resolve, reject) => {
          nunjucksEnvironment.renderString(
            html,
            { ...locals, ...locals[basename(context.path)] },
            (error, rendered) => {
              if (error) reject(error);
              else resolve(rendered as string);
            }
          );
        })
    }
  };
};
