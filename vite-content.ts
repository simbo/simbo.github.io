import { readFile } from 'node:fs/promises';

import { readPackageJson } from '@simbo/package-json';
import { stringifyError } from '@simbo/stringify-error';
import type { PackageJson } from 'type-fest';

/**
 * Project-relative path to the contact links used by the HTML templates.
 */
const LINKS_PATH = './src/content/links.json';

/**
 * A contact or profile link rendered in the terminal's contact list.
 */
export interface Link {
  href: string;
  type: string;
  label: string;
}

// Read and parse the links list.
let linksList: Link[];
try {
  const linksJson = await readFile(LINKS_PATH, 'utf8');
  linksList = JSON.parse(linksJson) as Link[];
} catch (error) {
  throw new Error(`Failed to read '${LINKS_PATH}': ${stringifyError(error)}`, { cause: error });
}

/**
 * Contact and profile links read from the project's content JSON during config loading.
 */
export const links: Link[] = linksList;

/**
 * Project package metadata used to expose the current version to templates and browser code.
 */
export const packageJson: PackageJson = await readPackageJson();
