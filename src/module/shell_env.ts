/**
 * Equivalent of $0 in bash
 */
export const __arg0: string = Deno.mainModule;
/**
 * Equivalent of $1 in bash
 */
export const __arg1: string | undefined = Deno.args[0] || undefined;
/**
 * Equivalent of $2 in bash
 */
export const __arg2: string | undefined = Deno.args[1] || undefined;
/**
 * Equivalent of $3 in bash
 */
export const __arg3: string | undefined = Deno.args[2] || undefined;
/**
 * Equivalent of $4 in bash
 */
export const __arg4: string | undefined = Deno.args[3] || undefined;
/**
 * Equivalent of $5 in bash
 */
export const __arg5: string | undefined = Deno.args[4] || undefined;
/**
 * Equivalent of $6 in bash
 */
export const __arg6: string | undefined = Deno.args[5] || undefined;
/**
 * Equivalent of $7 in bash
 */
export const __arg7: string | undefined = Deno.args[6] || undefined;
/**
 * Equivalent of $8 in bash
 */
export const __arg8: string | undefined = Deno.args[7] || undefined;
/**
 * Equivalent of $9 in bash
 */
export const __arg9: string | undefined = Deno.args[8] || undefined;
/**
 * Equivalent of $@ in bash
 */
export const __args: string[] = Deno.args;
/**
 * Equivalent of $# in bash
 */
export const __argsLength: number = Deno.args.length;
/**
 * Equivalent of "$*" in bash
 */
export const __argsAsString: string = Deno.args.join(" ");
