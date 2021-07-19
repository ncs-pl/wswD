import { internalTextDecoder, internalTextEncoder } from "../util.ts";

/**
 * Default shell used to execute commands.
 */
export const DEFAULT_SHELL = "bash";

/**
 * Default command which will be prefixed to all commands run.
 */
export const DEFAULT_PREFIX = "set -euo pipefail;";

/**
 * Mode for stderr and stdout
 * `piped` - A new pipe should be arranged to connect the parent and child sub-processes.
 * `inherit` - The default if unspecified. The child inherits from the corresponding parent descriptor.
 * `null`- This stream will be ignored. This is the equivalent of attaching the stream to /dev/null.
 */
export type OutputMode = "piped" | "inherit" | "null";

/**
 * Options to execute a command
 */
interface ExecuteOptions {
  /**
   * The command to execute
   */
  cmd: string;
  /**
   * The shell to use. Defaults to `SHELL`
   */
  shell: string;
  /**
   * Command which will be prefixed to all commands run.
   * Defaults to `PREFIX`.
   */
  prefix: string;
  /**
   * Mode for stderr and stdout
   */
  outputMode: OutputMode;
  /**
   * Environment variables to pass during command execution
   */
  env: Record<string, string>;
}

/**
 * Returns of internal execute function
 */
interface ExecuteReturn {
  status: Deno.ProcessStatus;
  stdout?: string;
  stderr?: string;
}

/**
 * Run a command using Deno.run.
 * @param opts - Options to execute
 */
async function execute(opts: ExecuteOptions): Promise<ExecuteReturn> {
  const subprocess = Deno.run({
    cmd: [opts.shell],
    stdin: "piped",
    stderr: opts.outputMode,
    stdout: opts.outputMode,
    env: opts.env,
  });

  await subprocess.stdin.write(
    internalTextEncoder.encode(opts.prefix + opts.cmd + "\n"),
  );
  subprocess.stdin.close();

  return {
    status: await subprocess.status(),
    stderr: opts.outputMode === "piped"
      ? internalTextDecoder.decode(await subprocess.stderrOutput())
      : undefined,
    stdout: opts.outputMode === "piped"
      ? internalTextDecoder.decode(await subprocess.output())
      : undefined,
  };
}

/**
 * Return type of an execution function when an error happened (exitCode is not 0)
 */
export interface ExecutionErrorReturn {
  code: number;
  stdout?: string;
  stderr?: string;
}

/**
 * Execute a command and return stdout.
 * @throws {ExecutionErrorReturn} Exception if exit code is not 0
 * @param cmd - Command to execute.
 * @param env - Env to set before executing `cmd`.
 * @param prefix - Command to execute before executing `cmd`. Defaults to `DEFAULT_PREFIX`
 * @param shell - Shell to execute `cmd` on. Defaults to `DEFAULT_SHELL`
 * @returns stdout
 */
export async function $(
  cmd: string,
  env?: Record<string, string>,
  prefix = DEFAULT_PREFIX,
  shell = DEFAULT_SHELL,
): Promise<string> {
  const { status, stdout, stderr }: ExecuteReturn = await execute({
    cmd,
    env: env || {},
    outputMode: "piped",
    prefix,
    shell,
  });

  if (status.code === 0) {
    return stdout as string;
  } else {
    throw {
      code: status.code,
      stdout,
      stderr,
    };
  }
}

/**
 * Execute a command and convert output into async iterable lines.
 * Idea from https://github.com/linux-china/dx/
 * @throws {ExecutionErrorReturn} Exception if exit code is not 0.
 * @param cmd - Command to execute.
 * @param env - Env to set before executing `cmd`.
 * @param prefix - Command to execute before executing `cmd`. Defaults to `DEFAULT_PREFIX`
 * @param shell - Shell to execute `cmd` on. Defaults to `DEFAULT_SHELL`
 * @returns stdout
 */
export async function* $a(
  cmd: string,
  env?: Record<string, string>,
  prefix = DEFAULT_PREFIX,
  shell = DEFAULT_SHELL,
): AsyncGenerator<string> {
  const { status, stdout, stderr }: ExecuteReturn = await execute({
    cmd,
    env: env || {},
    outputMode: "piped",
    prefix,
    shell,
  });

  if (status.code === 0) {
    const lines = (stdout as string).match(/[^\r\n]+/g);
    if (lines) {
      for (const line of lines) yield line;
    }
  } else {
    throw {
      code: status.code,
      stdout,
      stderr,
    };
  }
}

/**
 * Execute a command but does not return anything.
 * Idea from https://github.com/linux-china/dx/
 * @param cmd - Command to execute.
 * @param env - Env to set before executing `cmd`.
 * @param prefix - Command to execute before executing `cmd`. Defaults to `DEFAULT_PREFIX`
 * @param shell - Shell to execute `cmd` on. Defaults to `DEFAULT_SHELL`
 * @throws {ExecutionErrorReturn} Exception if exit code is not 0
 */
export async function $no(
  cmd: string,
  env?: Record<string, string>,
  prefix = DEFAULT_PREFIX,
  shell = DEFAULT_SHELL,
): Promise<void> {
  const { status, stdout, stderr }: ExecuteReturn = await execute({
    cmd,
    env: env || {},
    outputMode: "piped",
    prefix,
    shell,
  });
  if (status.code !== 0) {
    throw {
      code: status.code,
      stdout,
      stderr,
    };
  }
}
