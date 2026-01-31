import { describe, it, expect } from "@jest/globals";

describe("Sample Test Suite", () => {
  it("should pass a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string operations", () => {
    const greeting = "Hello, World!";
    expect(greeting).toContain("World");
    expect(greeting).toHaveLength(13);
  });

  it("should work with arrays", () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });

  it("should work with objects", () => {
    const user = {
      name: "Test User",
      age: 25,
    };
    expect(user).toHaveProperty("name");
    expect(user.name).toBe("Test User");
  });
});
