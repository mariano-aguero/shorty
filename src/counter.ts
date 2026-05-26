import type { Shorty } from "./shorty.ts";

/**
 * Lightweight read-only counter for short links.
 *
 * Useful for monitoring dashboards that need to display how popular each link
 * is without modifying the underlying store.
 */
export class HitCounter {
  constructor(private readonly shorty: Shorty) {}

  /** Read the current number of times a slug has been resolved. */
  count(slug: string): number {
    const url = this.shorty.resolve(slug);
    if (url === null) return 0;
    return this.shorty.peek(slug)?.hits ?? 0;
  }
}
