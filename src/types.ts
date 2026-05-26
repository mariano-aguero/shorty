export interface ShortLink {
  slug: string;
  url: string;
  createdAt: Date;
  hits: number;
}

export interface ShortyOptions {
  /** Length of generated slugs. Default 6. */
  slugLength?: number;
  /** Custom slug generator (for tests). */
  generateSlug?: () => string;
}

export class InvalidUrlError extends Error {
  constructor(input: string) {
    super(`invalid URL: ${input}`);
    this.name = "InvalidUrlError";
  }
}

export class SlugCollisionError extends Error {
  constructor(slug: string) {
    super(`slug already in use: ${slug}`);
    this.name = "SlugCollisionError";
  }
}
