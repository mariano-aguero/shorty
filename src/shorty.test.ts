import { beforeEach, describe, expect, it } from "vitest";
import { Shorty } from "./shorty.ts";
import { InvalidUrlError, SlugCollisionError } from "./types.ts";

describe("Shorty", () => {
  let shorty: Shorty;

  beforeEach(() => {
    shorty = new Shorty();
  });

  describe("shorten", () => {
    it("returns a link with the original URL and a generated slug", () => {
      const link = shorty.shorten("https://example.com");
      expect(link.url).toBe("https://example.com");
      expect(link.slug).toHaveLength(6);
      expect(link.hits).toBe(0);
    });

    it("throws InvalidUrlError for malformed URLs", () => {
      expect(() => shorty.shorten("not a url")).toThrow(InvalidUrlError);
    });

    it("stores the link so it can be resolved later", () => {
      const link = shorty.shorten("https://example.com");
      expect(shorty.resolve(link.slug)).toBe("https://example.com");
    });

    it("uses the configured slug length", () => {
      const custom = new Shorty({ slugLength: 10 });
      expect(custom.shorten("https://example.com").slug).toHaveLength(10);
    });
  });

  describe("shortenWithSlug", () => {
    it("uses the provided slug", () => {
      const link = shorty.shortenWithSlug("hello", "https://example.com");
      expect(link.slug).toBe("hello");
      expect(shorty.resolve("hello")).toBe("https://example.com");
    });

    it("throws SlugCollisionError when slug already exists", () => {
      shorty.shortenWithSlug("hello", "https://example.com");
      expect(() => shorty.shortenWithSlug("hello", "https://other.com")).toThrow(
        SlugCollisionError,
      );
    });

    it("throws InvalidUrlError for malformed URLs", () => {
      expect(() => shorty.shortenWithSlug("hello", "not a url")).toThrow(InvalidUrlError);
    });
  });

  describe("resolve", () => {
    it("returns null for unknown slugs", () => {
      expect(shorty.resolve("nope")).toBeNull();
    });

    it("increments the hit counter", () => {
      const link = shorty.shorten("https://example.com");
      shorty.resolve(link.slug);
      shorty.resolve(link.slug);
      shorty.resolve(link.slug);
      expect(shorty.peek(link.slug)?.hits).toBe(3);
    });
  });

  describe("peek", () => {
    it("returns the link without incrementing hits", () => {
      const link = shorty.shorten("https://example.com");
      shorty.peek(link.slug);
      shorty.peek(link.slug);
      expect(shorty.peek(link.slug)?.hits).toBe(0);
    });
  });

  describe("size + list", () => {
    it("tracks the number of stored links", () => {
      expect(shorty.size()).toBe(0);
      shorty.shorten("https://a.com");
      shorty.shorten("https://b.com");
      expect(shorty.size()).toBe(2);
      expect(shorty.list()).toHaveLength(2);
    });
  });

  describe("collision retry", () => {
    it("throws SlugCollisionError after exhausting retries", () => {
      const stuck = new Shorty({ generateSlug: () => "fixed" });
      stuck.shorten("https://example.com");
      expect(() => stuck.shorten("https://other.com")).toThrow(SlugCollisionError);
    });
  });
});
