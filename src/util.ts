import { isAbsolute, resolve, toFileUrl } from "../deps.ts";

/**
 * Everything in this file is used internally to make the module work,
 * do not export in mod.ts!
 */

/**
 * TextEncoder used all around the module to avoid create multiple ones.
 */
export const internalTextEncoder = new TextEncoder();

/**
 * TextDecoder used al around the module to avoid create multiple ones.
 */
export const internalTextDecoder = new TextDecoder();

/**
 * Resolve path by combining it with the current working directory (if not an absolute path) and resolving `..` and `.`
 * @param path - path to resolve
 * @returns resolved path
 */
export function resolvePath(path: string): string {
  return toFileUrl(path).pathname;
}
