if (argv._[0] == null) {
  console.error("Missing directory argument")
  process.exit(1)
}

const newDir = path.resolve(argv._[0])
console.log(`Creating new project at "${newDir}"`)

const extraIgnore = ["copy.mjs"]
const files = (await quiet($`git ls-tree -r main --name-only`))
  .stdout
  .split("\n")
  .filter((item) => Boolean(item) && !extraIgnore.includes(item))

await fs.mkdir(newDir, { recursive: true })
for (const filePath of files) {
  await fs.mkdir(path.resolve(newDir, path.dirname(filePath)), { recursive: true })
  await fs.copyFile(filePath, path.resolve(newDir, filePath))
}

cd(newDir)

const name = path.basename(argv._[0])
await fs.writeFile("README.md", `
# ${name}

<!--
[![npm](https://img.shields.io/npm/v/${name})](https://www.npmjs.com/package/${name})
![npm bundle size](https://img.shields.io/bundlephobia/minzip/${name})
![node-current](https://img.shields.io/node/v/${name})
[![Codecov](https://img.shields.io/codecov/c/github/BeeeQueue/${name}?token=TOKEN_HERE)](https://app.codecov.io/github/BeeeQueue/${name})
-->
`.trim())

await fs.writeFile("package.json", (await fs.readFile("package.json", "utf8")).replace("@beequeue/project-template", name))

// Remove git history

await $`git init --quiet`
await $`git add .`
await $`git commit --quiet -m "init"`
