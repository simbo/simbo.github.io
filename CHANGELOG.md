# simbo.github.io

## 3.5.3

### Patch Changes

- f7fce95: Introduce Vitest unit and integration tests with coverage, watch
  mode, UI, and CI checks. Keep adjacent command tests out of the production
  bundle and use the browser timer API explicitly for the typing animation.
- f7fce95: Use the shared Prettier configuration and align source formatting
  with it. Remove the obsolete ESLint configuration and npm lockfile in favor of
  the existing ESLint flat configuration and pnpm lockfile.

## 3.5.2

### Patch Changes

- f464ba8: fix scss var usage for prompt margin

## 3.5.1

### Patch Changes

- 62c1248: Disable Jekyll processing on GitHub Pages so JavaScript assets with
  leading underscores are served correctly.

## 3.5.0

### Minor Changes

- 33fcb6b: Introduce Changesets-based release automation and replace the
  existing CI workflow with dedicated checks, release, and publish workflows:

  - Run checks and builds for pull requests and pushes to `main`, require
    changesets for non-draft pull requests, and trigger releases after
    successful checks when changesets are present.
  - Verify the checked commit before integrating changesets, updating the
    version and changelog, and pushing a release commit and tag using the GitHub
    App identity.
  - Build tagged releases, validate their version against `package.json`,
    extract release notes from the changelog, create a ZIP archive and GitHub
    release, and deploy the website to GitHub Pages using the GitHub App
    identity.
  - Support manual releases and publishing existing version tags for rollbacks,
    and serialize release and publish runs.
  - Add Changesets configuration and a changelog covering previous releases.

### Patch Changes

- 33fcb6b: Update project tooling and dependencies, and clean up the website:

  - Remove the Twitter link and clean up `humans.txt`.
  - Correct the version entry in `package.json`.
  - Upgrade Node.js to v24, switch to pnpm, and add npm-check-updates.
  - Upgrade Vite and update its configuration, replace the HTML minifier with
    html-minifier-terser and a custom plugin, and extract content data into a
    separate file.
  - Upgrade ESLint, Prettier, and TypeScript, adopt shared configurations, and
    add spell checking with CSpell.
  - Add commitlint and Husky, and update Node.js type definitions.
  - Reorganize package scripts, simplify JSON handling and TypeScript
    configurations, and clean up SCSS imports.
  - Update EditorConfig, move the VS Code workspace file out of the project
    root, improve code comments, and fix linting issues.

## 3.4.0

### Minor Changes

- 912c90f: Change the domain from simbo.codes to simbo.de.

### Patch Changes

- f23f46a: Update the Umami tracking code.
- 717c6ba: Update the README.
- a1543f2: Update the dependency update badge in the README.
- 85edd3b: Update GitHub Actions and ignore the workspace file.
- cac1827: Update license info.

## 3.3.0

### Patch Changes

- 33ec3ed: Improve the CI workflow.
- a862494: Update the CI workflow to fetch with history to collect changes.
- ba99f63: Update the CI workflow to automatically create release packages with
  description.
- c5c2f8d: Upgrade Node.js to the latest LTS version and update dependencies.
- c1a4a53: Update the README.
- b319ff8: Remove the unused SVG loader.
- 35471fa: Add no-cache options to index.html.
- bbb4b04: Improve the Nunjucks plugin.

## 3.2.1

### Patch Changes

- a8695f3: Improve time to first meaningful paint by lazy-loading all components
  and styling uninitialized web components.

## 3.2.0

### Minor Changes

- d2dff72: Add manual pages and improve the command prompt.

### Patch Changes

- d2fb33a: Fix input zooming and font sizes on mobile devices.

## 3.1.7

### Patch Changes

- c37786b: Fix button font size.

## 3.1.6

### Patch Changes

- 1e3d62b: Expose dev server by default.
- daaeda2: Display command status, prevent new commands while another command is
  running, and improve interactions between commands and components.

## 3.1.5

### Patch Changes

- c00fd84: Prevent zooming when focusing inputs on mobile devices.

## 3.1.4

### Patch Changes

- fae566d: Add type command.

## 3.1.3

### Patch Changes

- 67a035a: Insert the command prompt statically.

## 3.1.2

### Patch Changes

- 6bdcd05: Revert lazy-loading of the command prompt.
- fdefeec2: Lazy-load the command prompt when the intro animation starts.
- 6afc978: Improve formatting in color theme module.
- 53b1bcf: Update the Nunjucks plugin for Vite 5.

## 3.1.1

### Patch Changes

- 369aae2: Remove console.log.

## 3.1.0

### Minor Changes

- 9d2499f: Add reload command.
- 300bd4d: Add command history.
- a8bced7: Add commands to maximize/minimize terminal view.
- 0a2156f: Add parameter parsing and more basic commands.
- 04ad94a: Save color theme preference in local storage.
- b6f8399: Implement basic command prompt.
- a57c718: Create terminal container; separate footer styles; automatically
  show/hide terminal cursor.
- 7019f89: Add terminal colors to color theme.

### Patch Changes

- 1618447: Insert the command prompt after the intro text has finished typing.
- 45e235a: Fix error handling for command handlers.
- f3179fd: Fix naming of module scope constant.
- 136b190: Improve clearing typed text.
- 5bf56e3: Display aliases with commands list.
- 5a1e2eb: All module scope constants to screaming snake case.
- 210fa14: Upgrade to Vite 5.
- 62bddf1: Improve naming for continue button reference.
- fba619d: Fix missing display style for color-theme-toggle.
- cd787ff: Improve type output break behavior.
- 7429b54: Set default style for svg-icon to 'block'.
- 43ad2d9: Simplify footer styles.
- f2fceff: Update ESLint rules.
- b41d957: Small style improvements for svg-icon.

## 3.0.2

### Patch Changes

- 8c0668a: Add smaller avatar images and use for typed container icon.
- 6409f30: Simplify the script that prevents a flash of unstyled content.
- 0051dd2: Add tooltip for theme toggle button.
- 98084dc: Improve positioning of color-theme-toggle to not overlay content
  container.
- 26a470a: Use variables for repeated content values.
- de65274: Update the MIT license URL.

## 3.0.1

### Patch Changes

- cb0af7d: Upgrade dependencies.

## 3.0.0

### Major Changes

- 60a4859: Rewrite the website with TypeScript, Vite, Nunjucks, and web
  components, including animated terminal text and a color theme toggle (#8).

### Patch Changes

- 6fc870e: Update the README.
- a2989ac: Update the CI workflow to also run on the main branch.
- 809b4f4: Update gh-pages deploy options.
- 3fba391: Update the Umami tracking script.
- 8a717a3: Restore the development setup and update dependencies.
