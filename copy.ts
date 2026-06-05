import fs from "node:fs"
import path from "node:path"
import process from "node:process"

import $ from "jsr:@david/dax@0.48.3"

const targetPath = process.argv[2]
if (targetPath == null) {
	console.error("Missing directory argument")
	process.exit(1)
}

const newDir = path.resolve(targetPath!)
console.log(`Creating new project at "${newDir}"`)

const extraIgnore = new Set(["copy.mjs", "copy.ts"])
const files = (await $`git ls-tree -r main --name-only`.lines()).filter(
	(item: string) => Boolean(item) && !extraIgnore.has(item),
)

for (const filePath of files) {
	fs.mkdirSync(path.join(newDir, path.dirname(filePath)), { recursive: true })
	fs.cpSync(filePath, path.join(newDir, filePath), { recursive: true })
}

process.chdir(newDir)

const name = path.basename(targetPath!)
fs.writeFileSync(
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

fs.writeFileSync(
	"package.json",
	fs.readFileSync("package.json", "utf8").replace("@beequeue/project-template", name),
)

// Remove git history

await $`git init --quiet`
await $`git add .`
await $`git commit --quiet -m "init"`

await $`pnpm i`
await $`smerge .`
await $`webstorm .`
