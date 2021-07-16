import { internalTextEncoder } from "../util.ts";
import { readLines } from "../../deps.ts";

/**
 * Reads from stdin and return input.
 * @param prompt - String to show before waiting for the user input.
 * @returns User input
 */
export async function read(prompt = "> "): Promise<string | undefined> {
  await Deno.stdout.write(internalTextEncoder.encode(prompt));

  for await (const readed of readLines(Deno.stdin)) {
    return readed;
  }
}
