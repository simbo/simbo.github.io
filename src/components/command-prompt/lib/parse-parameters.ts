import { unquote } from './unquote';

export interface ParsedParametersOptions {
  [key: string]: boolean | string;
}

export interface ParsedParameters {
  inputs: string[];
  options: ParsedParametersOptions;
}

const RX_PARTIAL = /^(--?[^\s"']+=)?("(\\"|[^"])*"|'(\\'|[^'])*'|\S+)/;
const RX_OPTION_PREFIX = /^--?\S/;
const RX_SINGLE_CHAR_OPTION_WITH_VALUE = /^-[a-z]=/i;
const RX_SINGLE_CHAR_OPTIONS = /^-[a-z]+$/i;
const RX_OPTION = /^--[a-z][\da-z]*([_-][a-z][\da-z]*)*/i;

export function parseParameters(input: string): ParsedParameters {
  input = input.trim();
  const parsedParameters: ParsedParameters = { inputs: [], options: {} };
  const partials: string[] = [];
  let match: RegExpMatchArray | null = null;
  while (input.length > 0) {
    const partial = (match = input.match(RX_PARTIAL)) === null ? input : match[0];
    partials.push(partial);
    input = input.slice(partial.length).trim();
  }
  for (let i = 0; i < partials.length; i++) {
    const partial = partials[i].trim();
    if (RX_OPTION_PREFIX.test(partial)) {
      if ((match = partial.match(RX_SINGLE_CHAR_OPTION_WITH_VALUE))) {
        parsedParameters.options[partial.charAt(1).toLowerCase()] = unquote(partial.slice(3));
      } else if ((match = partial.match(RX_SINGLE_CHAR_OPTIONS))) {
        const chars = [...match[0].slice(1).toLowerCase()];
        for (let j = 0; j < chars.length; j++) {
          parsedParameters.options[chars[j]] = true;
        }
      } else if ((match = partial.match(RX_OPTION))) {
        const option = partial.slice(2, match[0].length).toLowerCase();
        const value = partial.charAt(match[0].length) === '=' ? unquote(partial.slice(match[0].length + 1)) : true;
        parsedParameters.options[option] = value;
      }
    } else {
      parsedParameters.inputs.push(unquote(partial));
    }
  }
  return parsedParameters;
}
