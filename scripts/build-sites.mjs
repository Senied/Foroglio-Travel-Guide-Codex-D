import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(repositoryRoot, "dist", "client");
const publicEntries = [
  "index.html",
  "styles.css",
  "app.js",
  "favicon.svg",
  "assets",
  "guide",
  "previous",
  "releases",
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const entry of publicEntries) {
  await cp(join(repositoryRoot, entry), join(outputDirectory, entry), {
    recursive: true,
  });
}

console.log("Foroglio travel planner copied to dist/client.");
