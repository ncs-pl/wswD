import { assertEquals } from "../../dev_deps.ts";
import { exports } from "./mod.ts";

Deno.test("Should add a new environment variable", () => {
  const [name, value]: [string, string] = ["wswD_test_aiJjHXNCzuadsaLnwqDkXCBbsvYFBmDGMXD", "0123456789"]; // name, value
  
  exports([{
    name,
    value
  }]);

  assertEquals(Deno.env.get(name), value);

  // Delete variable
  Deno.env.delete(name);
});
