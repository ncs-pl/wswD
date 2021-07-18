import { resolvePath } from "../util.ts";

/**
 * Represents a directory to create
 */
export interface DirectoryCreator {
  /**
   * Path of the directory
   */
  path: string;
  /**
   * Defaults to `false`.
   * If set to `true`, means that any intermediate directories will also be created (as with the shell command `mkdir -p`).
   * Intermediate directories are created with the same permissions.
   * When recursive is set to `true`, succeeds silently (without changing any permissions) if a directory already exists at the path,
   * or if the path is a symlink to an existing directory.
   */
  recursive?: boolean;
  /**
   * Permissions to use when creating the directory (defaults to `0o777`, before the process's umask).
   * Ignored on Windows.
   */
  mode?: number;
}

/**
 * Make directories and creates needed directories (like mkdir -p)
 * @param paths - paths of directories to create
 * @returns paths of created directories
 */
export function mkdir(dirs: DirectoryCreator[]): string[] {
  const paths: string[] = [];

  for (const dir of dirs) {
    dir.path = resolvePath(dir.path);

    Deno.mkdirSync(dir.path, {
      recursive: dir.recursive || false,
      mode: dir.mode || 0o777,
    });

    paths.push(dir.path);
  }

  return paths;
}
