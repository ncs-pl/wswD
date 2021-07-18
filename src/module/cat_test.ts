import { assertEquals } from "../../dev_deps.ts";
import { cat, resolvePath } from "./mod.ts";

Deno.test("Should print the content of tests/file.txt", () => {
  const content: string = Deno.readTextFileSync(resolvePath(import.meta.url, "../../tests/file.txt"));
  const fileContent: string = cat(resolvePath(import.meta.url, "../../tests/file.txt"));

  assertEquals(content, fileContent[0]);
});
