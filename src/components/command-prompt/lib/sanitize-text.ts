const CHAR_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

/**
 * Escapes ampersands and angle brackets so text can be inserted into HTML content.
 * This helper does not escape quotes for HTML attributes or validate URLs.
 *
 * @param input - Plain text to escape before including it in an HTML text context.
 * @returns Text with `&`, `<`, and `>` replaced by their HTML entities.
 */
export function sanitizeText(input: string): string {
  return input.replaceAll(/[&<>]/g, match => CHAR_ESCAPE_MAP[match]);
}
