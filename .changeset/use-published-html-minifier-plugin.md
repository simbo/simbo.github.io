---
'simbo.github.io': patch
---

Replace the local HTML minifier with @simbo/vite-plugin-html-minifier while
preserving production whitespace handling and comment removal after template
rendering and asset processing. Remove the local implementation and its unit
tests, and use the package's bundled engine dependencies.
