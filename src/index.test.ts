import { describe, expect, test } from "vitest"

import { hello } from "./index.js"

describe("test", () => {
  test("test", () => {
    expect(hello).toBe("world")
  })
})
