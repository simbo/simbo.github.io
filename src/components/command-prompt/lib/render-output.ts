type Examples = string | string[] | undefined;
type OutputHandler = (output: string) => string | undefined;

export function renderUsageExamples(examples: string | string[]): string;
export function renderUsageExamples(examples: Examples): string | undefined;
export function renderUsageExamples(examples: Examples, outputHandler: OutputHandler): undefined;

/**
 * Formats usage examples as a labeled HTML section for the terminal.
 * Example strings are treated as HTML; escape any untrusted text before passing it in.
 *
 * @param examples - One example or a list of examples; missing or empty values produce no output.
 * @param outputHandler - Optional callback that receives the HTML instead of returning it directly.
 * @returns The formatted HTML, the callback's return value, or undefined when there is no output.
 */
export function renderUsageExamples(examples: Examples, outputHandler?: OutputHandler): string | undefined | void {
  if (!examples || examples.length === 0) {
    return;
  }
  examples = Array.isArray(examples) ? examples : [examples];
  const output = renderSection(
    'usage',
    `<br>${examples.map(example => `  <span class="yellow">${example}</span>`).join('<br>')}`,
  );
  return outputHandler ? outputHandler(output) : output;
}

/**
 * Adds a dimmed section label to terminal HTML without escaping the supplied content.
 *
 * @param title - Section label displayed before a colon.
 * @param content - HTML appended immediately after the label, including any desired spacing.
 * @returns The combined label and content as an HTML string.
 */
export function renderSection(title: string, content: string): string {
  return `<span class="dim">${title}:</span>${content}`;
}
