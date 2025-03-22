import { copy } from "https://deno.land/std@0.182.0/fs/mod.ts"
import $ from "https://deno.land/x/dax@0.31.0/mod.ts"

if (Deno.args[0] == null) {
  console.error("Missing directory argument")
  Deno.exit(1)
}

const newDir = $.path(Deno.args[0]).resolve()
console.log(`Creating new project at "${newDir}"`)

const extraIgnore = new Set(["copy.mjs", "copy.ts"])
const files = (await $`git ls-tree -r main --name-only`.lines()).filter(
  (item) => Boolean(item) && !extraIgnore.has(item),
)

await $`mkdir -p ${newDir}`
for (const filePath of files) {
  await $`mkdir -p ${newDir.join($.path(filePath).dirname()).toString()}`
  await copy(filePath, newDir.join(filePath).toString())
}

$.cd(newDir)

const name = $.path(Deno.args[0]).basename()
await Deno.writeTextFile(
  "README.md",
  `
# ${name}

<!--
[![npm](https://img.shields.io/npm/v/${name})](https://www.npmjs.com/package/${name})
![npm bundle size](https://img.shields.io/bundlephobia/minzip/${name})
![node-current](https://img.shields.io/node/v/${name})
-->
`.trim(),
)

await Deno.writeTextFile(
  "package.json",
  (await Deno.readTextFile("package.json")).replace("@beequeue/project-template", name),
)

// Remove git history

await $`git init --quiet`
await $`git add .`
await $`git commit --quiet -m "init"`

await $`pnpm i`
await $`smerge .`
await $`webstorm .`
