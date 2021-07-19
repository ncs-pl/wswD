import { assertEquals } from "../../dev_deps.ts";
import { pwd } from "./mod.ts";

Deno.test("Should get the current working directory path", () => {
  const cwd: string = Deno.cwd();
  assertEquals(pwd(), cwd);
});
