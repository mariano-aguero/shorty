const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Generate a random URL-safe slug of the given length.
 * Uses Math.random — not cryptographically secure; fine for non-adversarial use.
 */
export function generateSlug(length = 6): string {
  if (length <= 0) {
    throw new RangeError(`slug length must be > 0, got ${length}`);
  }
  let out = "";
  for (let i = 0; i < length; i++) {
    const idx = Math.floor(Math.random() * ALPHABET.length);
    out += ALPHABET[idx];
  }
  return out;
}

const URL_PATTERN = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

export function isValidUrl(input: string): boolean {
  if (typeof input !== "string") return false;
  if (input.length === 0 || input.length > 2048) return false;
  return URL_PATTERN.test(input);
}
