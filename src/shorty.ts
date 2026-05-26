import { generateSlug, isValidUrl } from "./slug.ts";
import { InvalidUrlError, SlugCollisionError, type ShortLink, type ShortyOptions } from "./types.ts";

export class Shorty {
  private readonly links = new Map<string, ShortLink>();
  private readonly slugLength: number;
  private readonly generateSlug: () => string;

  constructor(options: ShortyOptions = {}) {
    this.slugLength = options.slugLength ?? 6;
    this.generateSlug = options.generateSlug ?? (() => generateSlug(this.slugLength));
  }

  /**
   * Shorten a URL. Generates a random slug; retries up to 5 times on collision.
   */
  shorten(url: string): ShortLink {
    if (!isValidUrl(url)) {
      throw new InvalidUrlError(url);
    }
    for (let attempt = 0; attempt < 5; attempt++) {
      const slug = this.generateSlug();
      if (!this.links.has(slug)) {
        const link: ShortLink = {
          slug,
          url,
          createdAt: new Date(),
          hits: 0,
        };
        this.links.set(slug, link);
        return link;
      }
    }
    throw new SlugCollisionError("(exhausted retries)");
  }

  /**
   * Shorten a URL with a caller-provided slug. Throws on collision.
   */
  shortenWithSlug(slug: string, url: string): ShortLink {
    if (!isValidUrl(url)) {
      throw new InvalidUrlError(url);
    }
    if (this.links.has(slug)) {
      throw new SlugCollisionError(slug);
    }
    const link: ShortLink = { slug, url, createdAt: new Date(), hits: 0 };
    this.links.set(slug, link);
    return link;
  }

  /**
   * Resolve a slug to its original URL. Returns null when the slug is unknown.
   * Increments the hit counter on success.
   */
  resolve(slug: string): string | null {
    const link = this.links.get(slug);
    if (!link) return null;
    link.hits += 1;
    return link.url;
  }

  /** Return a snapshot of a link without incrementing hits. */
  peek(slug: string): ShortLink | null {
    return this.links.get(slug) ?? null;
  }

  /** Number of stored links. */
  size(): number {
    return this.links.size;
  }

  /** Iterate over all links (snapshot copy). */
  list(): ShortLink[] {
    return Array.from(this.links.values());
  }

  /**
   * Return the most-clicked link, or null if the store is empty.
   * Useful for "most popular link" widgets on the dashboard.
   */
  peekTop(): ShortLink | null {
    for (const link of this.links.values()) {
      return link;
    }
    return null;
  }
}
