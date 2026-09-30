import { readFile } from 'node:fs/promises';

import { readPackageJson } from '@simbo/package-json';
import { stringifyError } from '@simbo/stringify-error';
import type { PackageJson } from 'type-fest';

/**
 * The path to the JSON with personal contact/profile information links.
 */
const LINKS_PATH = './src/content/links.json';

/**
 * The interface for a link;
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
 * A list of links with personal contact information.
 */
export const links: Link[] = linksList;

/**
 * The project's current package.json as object.
 */
export const packageJson: PackageJson = await readPackageJson();
