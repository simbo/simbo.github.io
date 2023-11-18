type Examples = string | string[] | undefined;
type OutputHandler = (output: string) => void | string;

export function renderUsageExamples(examples: string | string[]): string;
export function renderUsageExamples(examples: Examples): string | undefined;
export function renderUsageExamples(examples: Examples, outputHandler: OutputHandler): undefined | void;
export function renderUsageExamples(examples: Examples, outputHandler?: OutputHandler): string | undefined | void {
  if (!examples || examples.length === 0) {
    return;
  }
  examples = Array.isArray(examples) ? examples : [examples];
  const output = renderSection(
    'usage',
    `<br>${examples.map(example => `  <span class="yellow">${example}</span>`).join('<br>')}`
  );
  return outputHandler ? outputHandler(output) : output;
}

export function renderSection(title: string, content: string): string {
  return `<span class="dim">${title}:</span>${content}`;
}
