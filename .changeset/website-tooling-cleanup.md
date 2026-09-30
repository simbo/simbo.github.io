---
'simbo.github.io': patch
---

Update project tooling and dependencies, and clean up the website:

- Remove the Twitter link and clean up `humans.txt`.
- Correct the version entry in `package.json`.
- Upgrade Node.js to v24, switch to pnpm, and add npm-check-updates.
- Upgrade Vite and update its configuration, replace the HTML minifier with
  html-minifier-terser and a custom plugin, and extract content data into a
  separate file.
- Upgrade ESLint, Prettier, and TypeScript, adopt shared configurations, and add
  spell checking with CSpell.
- Add commitlint and Husky, and update Node.js type definitions.
- Reorganize package scripts, simplify JSON handling and TypeScript
  configurations, and clean up SCSS imports.
- Update EditorConfig, move the VS Code workspace file out of the project root,
  improve code comments, and fix linting issues.
