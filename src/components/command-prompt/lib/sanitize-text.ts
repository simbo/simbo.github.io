const CHAR_ESCAPE_MAP: { [char: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

export function sanitizeText(input: string): string {
  return input.replaceAll(/[&<>]/g, match => CHAR_ESCAPE_MAP[match]);
}
