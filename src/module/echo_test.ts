import { echo } from "./mod.ts";

Deno.test("Should print to stdout", () => {
  echo("echo is just a copy of console.log!");
});
