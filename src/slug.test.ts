import { describe, expect, it } from "vitest";
import { generateSlug, isValidUrl } from "./slug.ts";

describe("generateSlug", () => {
  it("returns a string of the requested length", () => {
    expect(generateSlug(6)).toHaveLength(6);
    expect(generateSlug(12)).toHaveLength(12);
  });

  it("uses URL-safe characters only", () => {
    const s = generateSlug(100);
    expect(s).toMatch(/^[A-Za-z0-9]+$/);
  });

  it("defaults to length 6 when omitted", () => {
    expect(generateSlug()).toHaveLength(6);
  });

  it("throws for non-positive length", () => {
    expect(() => generateSlug(0)).toThrow(RangeError);
    expect(() => generateSlug(-1)).toThrow(RangeError);
  });
});

describe("isValidUrl", () => {
  it.each([
    "https://example.com",
    "http://example.com",
    "https://example.com/path",
    "https://example.com/path?query=1#hash",
    "https://sub.example.co.uk/long/path",
  ])("accepts %s", (url) => {
    expect(isValidUrl(url)).toBe(true);
  });

  it.each([
    "",
    "not a url",
    "ftp://example.com",
    "javascript:alert(1)",
    "//example.com",
    "example.com",
  ])("rejects %s", (url) => {
    expect(isValidUrl(url)).toBe(false);
  });

  it("rejects extremely long URLs (> 2048 chars)", () => {
    const long = `https://example.com/${"a".repeat(2050)}`;
    expect(isValidUrl(long)).toBe(false);
  });
});
