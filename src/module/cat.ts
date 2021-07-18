import { resolvePath } from "../util.ts";

/**
 * Returns the content of given files
 * @param paths - paths of the files to read
 * @returns - Contents of the files
 */
export function cat(...paths: string[]): string[] {
  const contents: string[] = [];

  for (const path of paths) {
    contents.push(Deno.readTextFileSync(resolvePath(path)));
  }

  return contents;
}
