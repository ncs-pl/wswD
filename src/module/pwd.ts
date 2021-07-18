/**
 * Gets the current working directory path and returns it
 * @returns the current working directory
 */
export function pwd(): string {
  return Deno.cwd();
}
