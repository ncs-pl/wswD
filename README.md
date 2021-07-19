# wswD

wswD is a tool to write scripts with Deno. (Inspired from
[google/zx](https://github.com/google/zx)).

Scripting with Deno gives the advantages of TypeScript and of easy imports.

## Status

This module was made in the goal of learning and is not production-ready
_(missing tests for example)_! You can use
[dx](https://github.com/linux-china/dx) or
[deno-script](https://github.com/jiraguha/deno-script).

## Usage

### Installation

Cache the module locally: `deno cache https://denopkg.com/n1c00o/wswD/mod.ts`

### Create script

Create a `.ts` file in which you will write your script. At the beginning of
this file, add:

```ts
#!/usr/bin/env -S deno run --allow-all --unstable
import {} from "https://denopkg.com/n1c00o/wswD/mod.ts";
```

_(See [docs/example.ts](docs/example.ts))_

### Make the file executable

```bash
chmod u+x file.ts;
```

### Run it

```bash
./file.ts
```

## Documentation

Online documentation on
[doc.deno.land](https://doc.deno.land/https/denopkg.com/n1c00o/wswD/mod.ts)

### Functions

#### $

```ts
async function $(
  cmd: string,
  env?: Record<string, string>,
  prefix = DEFAULT_PREFIX,
  shell = DEFAULT_SHELL,
): Promise<string>;
```

Execute a command and return stdout.

- `cmd` - Command to execute.
- `env` - Env to set before executing `cmd`.
- `prefix` - Command to execute before executing `cmd`. Defaults to
  [`DEFAULT_PREFIX`](#DEFAULT_PREFIX).
- `shell` - Shell to execute `cmd` on. Defaults to
  [`DEFAULT_SHELL`](#DEFAULT_SHELL).

> Throws [ExecutionErrorReturn](#ExecutionErrorReturn) if the exit code is
> not 0.

> Return: stdout.

Example:

```ts
import { $, echo } from "https://denopkg.com/n1c00o/wswD/mod.ts";

const run: string = await $("ls /");
echo(run);
```

---

#### $a

```ts
async function* $a(
  cmd: string,
  env?: Record<string, string>,
  prefix = DEFAULT_PREFIX,
  shell = DEFAULT_SHELL,
): AsyncGenerator<string>;
```

Execute a command and convert output into async iterable lines.

- `cmd` - Command to execute.
- `env` - Env to set before executing `cmd`.
- `prefix` - Command to execute before executing `cmd`. Defaults to
  [`DEFAULT_PREFIX`](#DEFAULT_PREFIX).
- `shell` - Shell to execute `cmd` on. Defaults to
  [`DEFAULT_SHELL`](#DEFAULT_SHELL).

> Throws [ExecutionErrorReturn](#ExecutionErrorReturn) if the exit code is
> not 0.

> Return: stdout as async iterable lines.

Example:

```ts
import { $a, echo } from "https://denopkg.com/n1c00o/wswD/mod.ts";

for await (const line of $a("ls /")) {
  echo(line);
}
```

---

#### $no

```ts
async function $no(
  cmd: string,
  env?: Record<string, string>,
  prefix,
  shell,
): Promise<void>;
```

Execute a command but does not return anything.

- `cmd` - Command to execute.
- `env` - Env to set before executing `cmd`.
- `prefix` - Command to execute before executing `cmd`. Defaults to
  [`DEFAULT_PREFIX`](#DEFAULT_PREFIX).
- `shell` - Shell to execute `cmd` on. Defaults to
  [`DEFAULT_SHELL`](#DEFAULT_SHELL).

  > Throws [ExecutionErrorReturn](#ExecutionErrorReturn) if the exit code is
  > not 0.

Example:

```ts
import { $no } from "https://denopkg.com/n1c00o/wswD/mod.ts";

await $no("ls /");
```

---

#### cat

```ts
function cat(...paths: string[]): string[];
```

Returns the content of given files.

- `paths` - Paths of the file to cat.

> Return: content of the files.

Example:

```ts
import { cat, echo, resolvePath } from "https://denopkg.com/n1c00o/wswD/mod.ts";

const content: string = cat(
  resolvePath(import.meta.url, "./file.txt"),
);

echo(content);
```

---

#### cd

```ts
function cd(path): string | void;
```

Change the current working directory to the one gived.

Support for ~ _(home directory)_.

If the given path is a "-" the command changes to the previous working directory
and return its name.

When no path is given, the command changes to the home directory.

- `path` - Location to move to.

> Return: New working directory when using cd("-")

Example:

```ts
import { cd, echo, pwd } from "https://denopkg.com/n1c00o/wswD/mod.ts";

cd("~");

echo(pwd());
echo(cd("-"));
```

---

#### cp

```ts
function cp(sources: CopyOptions[], target: string): void;
```

Copy files and/or directories.

- `sources` - Files or directories to copy with specific [options](#CopyOptions)
- `target` - Destination

Example :

```ts
import { cp, resolvePath } from "https://denopkg.com/n1c00o/wswD/mod.ts";

cp([{
  path: resolvePath(import.meta.url, "./file.txt"),
  overwrite: true,
}], resolvePath(import.meta.url, "./folder/new_file.txt"));
```

---

#### exports

```ts
function exports(vars: ExportOptions[]): ExportOptions[];
```

Set an environment variable. Function is named exports instead of export since
export is a Javascript-reserved keyword.

- `vars` - Variables to set. See [`ExportOptions`](#ExportOptions).

> Return: Exported variables.

Example:

```ts
import { echo, exports } from "https://denopkg.com/n1c00o/wswD/mod.ts";

exports([{
  name: "PASSWORD",
  value: "P@sSW0rd",
}]);

echo(Deno.env.get("PASSWORD"));
```

---

#### mkdir

```ts
function mkdir(dirs: DirectoryCreator[]): string[];
```

Make directories and creates needed directories (if specified)

- `dirs` - paths of directories to create. See
  [`DirectoryCreator`](#DirectoryCreator).

> Return: paths of created directories.

Example:

```ts
import { mkdir, resolvePath } from "https://denopkg.com/n1c00o/wswD/mod.ts";

mkdir([
  {
    path: resolvePath(
      import.meta.url,
      "./new_folder/new_child_folder",
    ),
    recursive: true, // like mkdir -p
  },
]);
```

---

#### mv

```ts
function mv(sources: MoveOptions[], target: string): void;
```

Move files and/or directories.

- `sources` - Files and/or directories to move. See
  [`MoveOptions`](#MoveOptions).
- `target` - Destination

Example:

```ts
import { mv, resolvePath } from "https://denopkg.com/n1c00o/wswD/mod.ts";

mv(
  [
    {
      path: resolvePath(
        import.meta.url,
        "./files/",
      ),
      overwrite: true,
    },
  ],
  resolvePath(
    import.meta.url,
    "./new_folder/",
  ),
);
```

---

#### pwd

```ts
function pwd(): string;
```

Gets the current working directory path and returns it

> Return: Current working directory

Example:

```ts
import { echo, pwd } from "https://denopkg.com/n1c00o/wswD/mod.ts";

echo(pwd());
```

---

#### read

```ts
function read(msg, defaultValue?: string): string | null;
```

Reads from stdin and return input.

- `msg` - String to show before waiting for the user input.
- `defaultValue` - Value retrned if the user does not enter any input.

> Return: User input, or defaultValue _(if one)_, or null.

Example:

```ts
import { echo, read } from "https://denopkg.com/n1c00o/wswD/mod.ts";

const name: string = read("Enter your name -> ", "Deno");
echo(`Hello ${name}!`);
```

---

#### resolvePath

```ts
function resolvePath(dir: string, filename: string): string;
```

Return the resolved path of a file with it parent folder when not giving an
absolute path.

- `dir` - Should be `import.meta.url`.
- `filename` - Path of the file, relative to the script file.

> Return: resolved path.

Example:

```ts
import { echo, resolvePath } from "https://denopkg.com/n1c00o/wswD/mod.ts";

echo(resolvePath(import.meta.url, "../../file.txt"));
```

---

#### rm

```ts
function rm(sources: RemoveOptions[]): void;
```

Removes files and/or directories

- `sources` - Files and/or directories to delete. See
  [`RemoveOptions`](#RemoveOptions).

Example:

```ts
import { resolvePath, rm } from "https://denopkg.com/n1c00o/wswD/mod.ts";

rm([
  {
    path: resolvePath(import.meta.url, "./non_enpty_folder/"),
    recursive: true, // remove child items
  },
  {
    path: resolvePath(import.meta.url, "./work/"),
  },
]);
```

---

#### sleep

```ts
async function sleep(time: number): Promise<void>;
```

Suspends execution for a certain amount of time (in seconds).

- `time` - A non-negative decimal integer specifying the number of seconds for
  which to suspend execution.

Example:

```ts
import { echo, sleep } from "https://denopkg.com/n1c00o/wswD/mod.ts";

echo(new Date().getSeconds());
await sleep(10);
echo(new Date().getSeconds());
```

---

### Variables

#### DEFAULT_PREFIX

```ts
const DEFAULT_PREFIX: "set -euo pipefail;";
```

Default command which will be prefixed to all commands run. (strict mode).

---

#### DEFAULT_SHELL

```ts
const DEFAULT_SHELL: "bash";
```

Default shell used to execute commands.

---

#### __arg0

```ts
const __arg0: string;
```

Equivalent as $0

---

#### __arg1

```ts
const __arg1: string;
```

Equivalent of $1 in bash

---

#### __arg2

```ts
const __arg2: string | undefined;
```

Equivalent of $2 in bash

---

#### __arg3

```ts
const __arg3: string | undefined;
```

Equivalent of $3 in bash

---

#### __arg4

```ts
const __arg4: string | undefined;
```

Equivalent of $4 in bash

---

#### __arg5

```ts
const __arg5: string | undefined;
```

Equivalent of $5 in bash

---

#### __arg6

```ts
const __arg6: string | undefined;
```

Equivalent of $6 in bash

---

#### __arg7

```ts
const __arg7: string | undefined;
```

Equivalent of $7 in bash

---

#### __arg8

```ts
const __arg8: string | undefined;
```

Equivalent of $8 in bash

---

#### __arg9

```ts
const __arg9: string | undefined;
```

Equivalent of $9 in bash

---

#### __args

```ts
const __args: string[];
```

Equivalent of $@ in bash

---

#### __argsAsString

```ts
const __argsAsString: string;
```

Equivalent of "$*" in bash

---

#### __argsLength

```ts
const __argsLength: number;
```

Equivalent of $# in bash

---

#### echo

```ts
const echo;
```

Prints to stdout. If no string is given, prints a `<newline>`

---

### Interfaces

#### CopyOptions

```ts
interface CopyOptions
```

Options to copy a file or a directory

**Properties:**

```ts
path:
string;
```

src the file/directory path. Note that if src is a directory it will copy
everything inside of this directory, not the entire directory itself

```ts
overwrite?: boolean
```

overwrite existing file or directory. Default is `false`

```ts
preserveTimestamps?: boolean
```

When true, will set last modification and access times to the ones of the
original source files. When `false`, timestamp behavior is OS-dependent. Default
is `false`.

---

#### DirectoryCreator

```ts
interface DirectoryCreator
```

Represents a directory to create.

**Properties:**

```ts
path:
string;
```

Path of the directory

```ts
recursive?: boolean
```

Defaults to `false`.

If set to `true`, means that any intermediate directories will also be created
_(as with the shell command mkdir -p)_. Intermediate directories are created
with the same permissions.

When recursive is set to `true`, succeeds silently _(without changing any
permissions)_ if a directory already exists at the path, or if the path is a
symlink to an existing directory.

```ts
mode?: number
```

Permissions to use when creating the directory _(defaults to `0o777`, before the
process's umask)_. Ignored on Windows.

---

#### ExecutionErrorReturn

```ts
interface ExecutionErrorReturn
```

Return type of an execution function when an error happened (exitCode is not 0)

**Properties:**

```ts
code:
number;
```

```ts
stdout?: string
```

```ts
stderr?: string
```

---

#### ExportOptions

```ts
interface ExportOptions
```

Options to export a variable

**Properties:**

```ts
name:
string;
```

Name of the variable

```ts
value:
string;
```

Value of the variable

---

#### MoveOptions

```ts
interface MoveOptions
```

Options to move a file or a directory

**Properties:**

```ts
path:
string;
```

Path of the file or directory to move

```ts
overwrite?: boolean
```

Overwrite existing file or directory. Defaults to `false`

---

#### RemoveOptions

```ts
interface RemoveOptions
```

Options to remove a file and/or a directory

**Properties:**

```ts
path:
string;
```

Path of the file or directory

```ts
recursive?: boolean
```

Defaults to false. If set to true, path will be removed even if it's a non-empty
directory.

---

### Type Aliases

#### OutputMode

```ts
type OutputMode: "piped" | "inherit" | "null"
```

Mode for stderr and stdout.

- `piped` - A new pipe should be arranged to connect the parent and child
  sub-processes.
- `inherit` - The default if unspecified. The child inherits from the
  corresponding parent descriptor.
- `null` - This stream will be ignored. This is the equivalent of attaching the
  stream to `/dev/null`.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

This project is under the Apache-2.0 license. See [LICENSE](LICENSE).
