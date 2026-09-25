import { describe, it, expect } from "vitest";
import { LoginSchema, RegisterSchema, USER_ROLES } from "./index";

describe("Shared Validation Schemas", () => {
  it("should validate correct login payload", () => {
    const validData = {
      email: "user@example.com",
      password: "password123",
    };

    const parsed = LoginSchema.parse(validData);
    expect(parsed.email).toBe(validData.email);
  });

  it("should fail on invalid email for registration", () => {
    const invalidData = {
      email: "not-an-email",
      password: "password123",
      fullName: "Test User",
      role: USER_ROLES.USER,
    };

    expect(() => RegisterSchema.parse(invalidData)).toThrow();
  });
});
