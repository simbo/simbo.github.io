# simbo.de (simbo.github.io)

[![Uptime Ratio (last 30 days)](https://img.shields.io/uptimerobot/ratio/m804047239-e9fa4a5e4facda92c8851a22)](https://simbo.de/)
[![Project Version](https://img.shields.io/github/package-json/version/simbo/simbo.github.io)](https://github.com/simbo/simbo.github.io/blob/main/package.json)
[![Last Commit](https://img.shields.io/github/last-commit/simbo/simbo.github.io/main)](https://github.com/simbo/simbo.github.io/commits/main)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-grass)](https://github.com/simbo/simbo.github.io/blob/main/package.json)
[![Last CI Workflow Status](https://img.shields.io/github/actions/workflow/status/simbo/simbo.github.io/ci.yml?branch=main)](https://github.com/simbo/simbo.github.io/actions?query=workflow%3ACI)

---

My personal website.

<div style="width: 100%;">
  <a href="https://simbo.de/" target="_blank"><img src="readme-button.svg" style="width: 100%;"></a>
</div>

See generated contents at the
[`gh-pages`](https://github.com/simbo/simbo.github.io/tree/gh-pages) branch.

## Development and Tests

Install dependencies with `pnpm install` and start the development server with
`pnpm run serve`.

- `pnpm run test`: run all unit and integration tests with V8 coverage.
- `pnpm run test:watch`: rerun tests while editing, including coverage.
- `pnpm run test:ui`: open the Vitest UI.
- `pnpm run serve:coverage`: serve the HTML coverage report.
- `pnpm run preflight`: run all checks, tests, and the production build.

The Vitest scripts and coverage configuration follow
[simbo/packages](https://github.com/simbo/packages). Test files use the
`.test.ts` suffix and live next to the file being tested. Tests spanning
multiple modules live in `tests/`, alongside shared test helpers and setup.
Browser code is tested in jsdom; build plugins use the Node.js environment.
Coverage reports are written to `coverage/` as HTML and LCOV, with a summary in
the terminal. End-to-end tests are not included.

## License and Author

[MIT &copy; 2018 Simon Lepel](https://simbo.mit-license.org/@2018/)
