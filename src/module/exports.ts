/**
 * Options to export a variable
 */
export interface ExportOptions {
  /**
   * Name of the variable
   */
  name: string;
  /**
   * Value of the variable
   */
  value: string;
}

/**
 * Set an environment variable.
 * Function is named exports instead of export since export is a Javascript-reserved keyword.
 * @param vars - Variables to set.
 * @returns exported variables.
 */
export function exports(vars: ExportOptions[]): ExportOptions[] {
  for (const variable of vars) {
    Deno.env.set(variable.name, variable.value);
  }

  return vars;
}
