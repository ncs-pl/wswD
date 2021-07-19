import { sleep } from "./mod.ts";
import { assertNotEquals } from "../../dev_deps.ts";

Deno.test("Should stop execution for a certains amount of time", async () => {
  const seconds: number = new Date().getSeconds();
  await sleep(10);
  assertNotEquals(seconds, new Date().getSeconds());
});
