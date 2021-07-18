import { resolvePath } from "../util.ts";

/**
 * Options to remove a file and/or a directory
 */
export interface RemoveOptions {
  /**
   * Path of the file or directory
   */
  path: string;
  /**
   * Defaults to false. If set to true, path will be removed even if it's a non-empty directory.
   */
  recursive?: boolean;
}

/**
 * Removes files and/or directories
 * @param sources - Files and/or directories to remove
 */
export function rm(sources: RemoveOptions[]): void {
  for (const source of sources) {
    source.path = resolvePath(source.path);
    Deno.removeSync(source.path, {
      recursive: source.recursive || false,
    });
  }
}
