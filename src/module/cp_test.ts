import { assertEquals } from "../../dev_deps.ts";
import { cp, resolvePath } from "./mod.ts";

Deno.test("Should copy content of tests/file.txt into new_file.txt", () => {
  const originalFilePath: string = resolvePath(
    import.meta.url,
    "../../tests/file.txt",
  );
  const secondFilePath: string = resolvePath(
    import.meta.url,
    "../../tests/cp_test_file.txt",
  );

  const originalFileContent: string = Deno.readTextFileSync(originalFilePath);

  cp([{
    path: resolvePath(import.meta.url, "../../tests/file.txt"), // using originalFilePath returns an error but not this...
    overwrite: true,
  }], secondFilePath);

  const secondFileContent: string = Deno.readTextFileSync(secondFilePath);

  assertEquals(originalFileContent, secondFileContent);

  // Reset the content of tests/cp_test_file.txt
  Deno.writeTextFileSync(secondFilePath, "", {
    append: false,
  });
});
