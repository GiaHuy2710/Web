import { describe, it, expect } from "vitest";
import { app } from "./server";

describe("Server Core Tests", () => {
  it("should have express app initialized", () => {
    expect(app).toBeDefined();
  });
});
