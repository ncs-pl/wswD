import { assertEquals } from "../../dev_deps.ts";
import { cat, resolvePath } from "./mod.ts";

Deno.test("cat command", () => {
  const content = "This is a text!\n";
  const fileContent = cat(resolvePath(import.meta.url, "../../tests/file.txt"));

  assertEquals(content, fileContent[0]);
});
