import { delay } from "../../deps.ts";

/**
 * Suspends execution for a certain amount of time (in seconds)
 * @param time - A non-negative decimal integer specifying the number of seconds for which to suspend execution.
 */
export async function sleep(time: number): Promise<void> {
  await delay(time * 1000);
}
