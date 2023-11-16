const charEscapeMap: { [char: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

export function sanitizeText(input: string): string {
  return input.replaceAll(/[&<>]/g, match => charEscapeMap[match]);
}
