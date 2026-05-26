import { beforeEach, describe, expect, it } from "vitest";
import { HitCounter } from "./counter.ts";
import { Shorty } from "./shorty.ts";

describe("HitCounter", () => {
  let shorty: Shorty;
  let counter: HitCounter;

  beforeEach(() => {
    shorty = new Shorty();
    counter = new HitCounter(shorty);
  });

  it("returns 0 for an unknown slug", () => {
    expect(counter.count("nope")).toBe(0);
  });

  it("returns the current hit count for a known slug", () => {
    shorty.shortenWithSlug("foo", "https://example.com");
    shorty.resolve("foo");
    shorty.resolve("foo");
    expect(counter.count("foo")).toBe(3);
  });
});
