import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(repositoryRoot, "dist", "client");
const serverDirectory = join(repositoryRoot, "dist", "server");
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
await rm(serverDirectory, { recursive: true, force: true });
await mkdir(serverDirectory, { recursive: true });

for (const entry of publicEntries) {
  await cp(join(repositoryRoot, entry), join(outputDirectory, entry), {
    recursive: true,
  });
}

// The current guide already lives at /guide; keep only earlier editions in the archive area.
await rm(join(outputDirectory, "releases", "v1.3"), {
  recursive: true,
  force: true,
});

await cp(
  join(repositoryRoot, "worker", "index.js"),
  join(serverDirectory, "index.js"),
);

console.log("Foroglio travel planner prepared for hosting.");
