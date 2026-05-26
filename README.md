# shorty

Tiny in-memory URL shortener written in TypeScript. Useful as a small target for code review experiments.

## Quick start

```bash
pnpm install
pnpm check       # typecheck + tests
pnpm test:watch  # TDD mode
```

## Usage

```ts
import { Shorty } from "shorty";

const shorty = new Shorty();
const link = shorty.shorten("https://example.com");
console.log(link.slug);                 // e.g. "Ab3xKz"
console.log(shorty.resolve(link.slug)); // "https://example.com"
console.log(shorty.peek(link.slug)?.hits); // 1
```

You can also pin the slug:

```ts
shorty.shortenWithSlug("blog", "https://example.com/blog");
shorty.resolve("blog"); // "https://example.com/blog"
```

## API

| Method | Returns | Notes |
|---|---|---|
| `shorten(url)` | `ShortLink` | Throws `InvalidUrlError` for malformed URLs. Retries on slug collision (5 attempts). |
| `shortenWithSlug(slug, url)` | `ShortLink` | Throws `SlugCollisionError` if the slug is taken. |
| `resolve(slug)` | `string \| null` | Increments the hit counter. |
| `peek(slug)` | `ShortLink \| null` | Read without side effects. |
| `size()` | `number` | Number of stored links. |
| `list()` | `ShortLink[]` | Snapshot of all links. |

## Stack

TypeScript 5 strict • Node 20+ • Vitest. No runtime dependencies.

## License

MIT
