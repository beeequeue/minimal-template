import assert from "node:assert"
import { describe, it } from "node:test"

import { hello } from "./index.ts"

describe("test", () => {
  it("test", () => {
    assert.equal(hello(), "world")
  })
})
