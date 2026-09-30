---
'simbo.github.io': minor
---

Introduce Changesets-based release automation and replace the existing CI
workflow with dedicated checks, release, and publish workflows:

- Run checks and builds for pull requests and pushes to `main`, require
  changesets for non-draft pull requests, and trigger releases after successful
  checks when changesets are present.
- Verify the checked commit before integrating changesets, updating the version
  and changelog, and pushing a release commit and tag using the GitHub App
  identity.
- Build tagged releases, validate their version against `package.json`, extract
  release notes from the changelog, create a ZIP archive and GitHub release, and
  deploy the website to GitHub Pages using the GitHub App identity.
- Support manual releases and publishing existing version tags for rollbacks,
  and serialize release and publish runs.
- Add Changesets configuration and a changelog covering previous releases.
