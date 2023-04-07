import $ from "https://deno.land/x/dax/mod.ts"

if (Deno.args[0] == null) {
  console.error("Missing directory argument")
  Deno.exit(1)
}

const newDir = $.path.resolve(Deno.args[0])
console.log(`Creating new project at "${newDir}"`)

const extraIgnore = new Set(["copy.mjs", "copy.ts"])
const files = (await $`git ls-tree -r main --name-only`.lines()).filter(
  (item) => Boolean(item) && !extraIgnore.has(item),
)

await $.fs.ensureDir(newDir, { recursive: true })
for (const filePath of files) {
  await $.fs.ensureDir($.path.resolve(newDir, $.path.dirname(filePath)), {
    recursive: true,
  })
  await $.fs.copy(filePath, $.path.resolve(newDir, filePath), { overwrite: true })
}

$.cd(newDir)

const name = $.path.basename(Deno.args[0])
await Deno.writeTextFile(
  "README.md",
  `
# ${name}

<!--
[![npm](https://img.shields.io/npm/v/${name})](https://www.npmjs.com/package/${name})
![npm bundle size](https://img.shields.io/bundlephobia/minzip/${name})
![node-current](https://img.shields.io/node/v/${name})
[![Codecov](https://img.shields.io/codecov/c/github/BeeeQueue/${name}?token=TOKEN_HERE)](https://app.codecov.io/github/BeeeQueue/${name})
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
