#!/usr/bin/env -S deno run --allow-all --unstable
import { echo, pwd, read } from "https://denopkg.com/n1c00o/wswD/mod.ts";

echo("Hello, Deno!");

console.log(`Working directory: ${pwd()}`);

const username: string = read("What is your name ? ", "John");
echo(`Hello ${username}`);
