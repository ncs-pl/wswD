import { copySync } from "../../deps.ts";
import { resolvePath } from "../util.ts";

/**
 * Options to copy a file or a directory
 */
export interface CopyOptions {
  /**
   * src the file/directory path. Note that if src is a directory it will copy everything inside of this directory, not the entire directory itself
   */
  path: string;
  /**
   * overwrite existing file or directory. Default is `false`
   */
  overwrite?: boolean;
  /**
   * When `true`, will set last modification and access times to the ones of the original source files. When `false`, timestamp behavior is OS-dependent. Default is `false`.
   */
  preserveTimestamps?: boolean;
}

/**
 * Copy files and/or directories.
 * @param sources - Files or directories to copy
 * @param target - Destination
 */
export function cp(sources: CopyOptions[], target: string): void {
  for (const source of sources) {
    copySync(resolvePath(source.path), resolvePath(target), {
      overwrite: source.overwrite || false,
      preserveTimestamps: source.preserveTimestamps || false,
    });
  }
}
