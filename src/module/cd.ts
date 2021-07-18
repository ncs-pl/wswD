import { homedir } from "../../deps.ts";
import { resolvePath } from "../util.ts";

/**
 * Store the previous working directory, equivalent to the env OLDPWD on Linux.
 */
let PREVIOUS_WORKING_DIRECTORY = Deno.cwd();

/**
 * Change the current working directory to the one gived.
 * Support for ~ (home directory).
 * If the given path is a "-" the command changes to the previous working directory and return its name.
 * When no path is given, the command changes to the home directory.
 * @param path - Location to move to.
 * @returns
 */
export function cd(path = "~"): string | void {
  path = path.trim();

  if (path === "-") {
    path = PREVIOUS_WORKING_DIRECTORY;
    PREVIOUS_WORKING_DIRECTORY = Deno.cwd();
    Deno.chdir(resolvePath(path));
    return path;
  } else if (path.startsWith("~")) {
    path = homedir() + path.substr(1);
    PREVIOUS_WORKING_DIRECTORY = Deno.cwd();
    Deno.chdir(resolvePath(path));
  }
}
