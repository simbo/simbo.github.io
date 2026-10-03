import { expect, it } from 'vitest';

import { sanitizeText } from './sanitize-text.js';

it.each([
  ['<&>', '&lt;&amp;&gt;'],
  ['<script>alert("x")</script>', '&lt;script&gt;alert("x")&lt;/script&gt;'],
  ['&amp;', '&amp;amp;'],
  ['hello', 'hello'],
  ['', ''],
])('escapes %s', (input, expected) => {
  expect(sanitizeText(input)).toBe(expected);
});
