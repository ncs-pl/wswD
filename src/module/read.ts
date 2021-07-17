/**
 * Reads from stdin and return input.
 * @param msg - String to show before waiting for the user input.
 * @param defaultValue - Value returned if the user does not enter any input.
 * @returns User input
 */
export function read(msg = "> ", defaultValue?: string): string | null {
  return prompt(msg, defaultValue);
}
