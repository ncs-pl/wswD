import { assertEquals, assertNotEquals } from "../../dev_deps.ts";
import { cd } from "./mod.ts";

Deno.test("Should change directory to ~ and then go back", () => {
  const originalWorkingDir: string = Deno.cwd();

  cd("~");
  assertNotEquals(Deno.cwd(), originalWorkingDir); // CWD should be ~

  // "-" makes going to the last working dir (originalWorkingDir).
  // When using "-", cd returns the working directory.
  assertEquals(cd("-"), originalWorkingDir);
});
