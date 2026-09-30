const QUOTES = ['"', "'"];

/**
 * Removes matching outer single or double quotes and unescapes that quote character.
 * Other escape sequences are preserved, and unmatched outer quotes are left intact.
 *
 * @param input - A parameter value that may be enclosed in matching quotes.
 * @returns The unquoted value, or the original input if its outer quotes do not match.
 */
export function unquote(input: string): string {
  for (const quote of QUOTES) {
    if (input.at(0) === quote && input.at(-1) === quote) {
      return input.slice(1, -1).replaceAll(new RegExp(`\\\\${quote}`, 'g'), () => quote);
    }
  }
  return input;
}
