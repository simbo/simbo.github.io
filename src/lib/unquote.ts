const QUOTES = ['"', "'"];

export function unquote(input: string): string {
  for (let i = 0; i < QUOTES.length; i++) {
    const quote = QUOTES[i];
    if (input.at(0) === quote && input.at(-1) === quote) {
      return input.slice(1, -1).replaceAll(new RegExp(`\\\\${quote}`, 'g'), quote);
    }
  }
  return input;
}
