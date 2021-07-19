import { assertEquals, assertNotEquals } from "../../dev_deps.ts";
import { $, $a, $no } from "./mod.ts";

const command = "ls /"; // Make sure to use a command which use stdout!

Deno.test({
  name:
    "Should execute a command using bash and has a non-null string on stdout",
  fn: async () => {
    const run: string = await $(command);
    assertNotEquals(run, "");
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

Deno.test({
  name: "Should execute a command using bash and return stdout as lines async",
  fn: async () => {
    const asyncRes: string[] = [];
    for await (const line of $a(command)) asyncRes.push(line);
    assertNotEquals(asyncRes.length, 0);
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

Deno.test({
  name: "Should execute a command using bash but does not return something",
  fn: async () => {
    const run: void = await $no(command);
    assertEquals(run, undefined);
  },
  sanitizeOps: false,
  sanitizeResources: false,
});
