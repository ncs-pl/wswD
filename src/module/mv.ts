import { moveSync } from "../../deps.ts";

/**
 * Options to move a file or a directory
 */
export interface MoveOptions {
  /**
   * Path of the file or directory to move
   */
  path: string;
  /**
   * Overwrite existing file or directory. Defaults to `false
   */
  overwrite?: boolean;
}

/**
 * Move files and/or directories
 * @param sources - files and/or directories to move
 * @param target - Destination
 */
export function mv(sources: MoveOptions[], target: string): void {
  for (const source of sources) {
    moveSync(source.path, target, {
      overwrite: source.overwrite || false
    })
  }
}
