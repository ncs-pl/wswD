import { assertEquals } from "../../dev_deps.ts";
import { mkdir, resolvePath } from "./mod.ts";
import { existsSync } from "../../deps.ts";

Deno.test("Should create a directory in tests/", () => {
  mkdir([
    {
      path: resolvePath(
        import.meta.url,
        "../../tests/mkdir_test_folder/mkdir_test_folder_with_recursive",
      ),
      recursive: true,
    },
  ]);

  assertEquals(
    existsSync(
      resolvePath(
        import.meta.url,
        "../../tests/mkdir_test_folder/mkdir_test_folder_with_recursive",
      ),
    ),
    true,
  );

  // Remove created dirs
  Deno.removeSync(
    resolvePath(import.meta.url, "../../tests/mkdir_test_folder/"),
    {
      recursive: true,
    },
  );
});
