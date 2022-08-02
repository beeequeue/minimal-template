import { fileURLToPath } from "url"

const dirname = path.dirname(fileURLToPath(import.meta.url))

if (argv._[0] == null) {
  console.error("Missing directory argument")
  process.exit(1)
}

const newDir = path.resolve(argv._[0])
console.log(`Creating new project at "${newDir}"`)

const extraIgnore = ["copy.mjs"]
const files = (
  await quiet($`git ls-tree -r main --name-only`))
    .stdout
    .split("\n")
    .filter((item) => Boolean(item) && !extraIgnore.includes(item)
)

await fs.mkdir(newDir, { recursive: true })
for (const filePath of files) {
  await fs.mkdir(path.resolve(newDir, path.dirname(filePath)), { recursive: true })
  await fs.copyFile(filePath, path.resolve(newDir, filePath))
}

cd(newDir)

await $`git init`
await $`git add .`
await $`git commit -m "init"`

await $`pnpm i`

await $`smerge ${newDir}`
