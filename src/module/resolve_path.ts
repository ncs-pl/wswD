import { dirname, fromFileUrl, resolve } from "../../deps.ts";

/**
 * Return the resolved path of a file with it parent folder when not giving an absolute path
 */
export function resolvePath(dir: string, filename: string): string {
  return resolve(
    dirname(
      fromFileUrl(dir),
    ),
    filename,
  );
}
