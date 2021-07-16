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
