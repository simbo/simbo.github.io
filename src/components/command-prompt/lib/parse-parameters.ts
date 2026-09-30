import { unquote } from './unquote.js';

export type ParsedParametersOptions = Record<string, boolean | string>;

export interface ParsedParameters {
  inputs: string[];
  options: ParsedParametersOptions;
}

const RX_PARTIAL = /^(--?[^\s"']+=)?("(\\"|[^"])*"|'(\\'|[^'])*'|\S+)/;
const RX_OPTION_PREFIX = /^--?\S/;
const RX_SINGLE_CHAR_OPTION_WITH_VALUE = /^-[a-z]=/i;
const RX_SINGLE_CHAR_OPTIONS = /^-[a-z]+$/i;
const RX_OPTION = /^--[a-z][\da-z]*([_-][a-z][\da-z]*)*/i;

/**
 * Splits a command's parameter string into positional inputs and named options.
 * Quoted values stay together; option names are normalized to lowercase.
 * Supports flags such as `-ab`, `--all`, and assignments such as `--name="Jane Doe"`.
 *
 * @param input - Parameter text after the command name, including any quotes and flags.
 * @returns Positional inputs and a map of boolean flags or string option values.
 */
export function parseParameters(input: string): ParsedParameters {
  input = input.trim();
  const parsedParameters: ParsedParameters = { inputs: [], options: {} };
  const partials: string[] = [];
  let match: RegExpMatchArray | null;
  while (input.length > 0) {
    const partial = (match = RX_PARTIAL.exec(input)) === null ? input : match[0];
    partials.push(partial);
    input = input.slice(partial.length).trim();
  }
  for (const currentPartial of partials) {
    const partial = currentPartial.trim();
    if (RX_OPTION_PREFIX.test(partial)) {
      if ((match = RX_SINGLE_CHAR_OPTION_WITH_VALUE.exec(partial))) {
        parsedParameters.options[partial.charAt(1).toLowerCase()] = unquote(partial.slice(match[0].length));
      } else if ((match = RX_SINGLE_CHAR_OPTIONS.exec(partial))) {
        const chars = match[0].slice(1).toLowerCase();
        for (const char of chars) {
          parsedParameters.options[char] = true;
        }
      } else if ((match = RX_OPTION.exec(partial))) {
        const option = partial.slice(2, match[0].length).toLowerCase();
        parsedParameters.options[option] =
          // eslint-disable-next-line unicorn/prefer-logical-operator-over-ternary
          partial.charAt(match[0].length) === '=' ? unquote(partial.slice(match[0].length + 1)) : true;
      }
    } else {
      parsedParameters.inputs.push(unquote(partial));
    }
  }
  return parsedParameters;
}
