import { randomBytes } from 'crypto';

// A compact, unambiguous alphabet (no 0/O, 1/l, etc.)
const DEFAULT_ALPHABET =
  'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

/**
 * Generate a single secure invite code.
 *
 * Uses Node's crypto.randomBytes for cryptographic randomness and maps bytes
 * into the provided alphabet. The generated codes are URL-safe and case
 * sensitive (depending on the alphabet).
 *
 * @param length - number of characters in the code (default 8)
 * @param alphabet - optional alphabet string to draw characters from
 * @returns invite code string
 */
export function generateInviteCode(
  length = 8,
  alphabet = DEFAULT_ALPHABET,
): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new TypeError('length must be a positive integer');
  }
  if (!alphabet || typeof alphabet !== 'string' || alphabet.length < 2) {
    throw new TypeError('alphabet must be a string with at least 2 characters');
  }

  const alphabetLen = alphabet.length;
  // Generate secure random bytes and map each byte to a character index.
  const rnd = randomBytes(length);
  let out = '';
  for (let i = 0; i < length; i++) {
    // Map byte to index in alphabet using modulo - uniform enough for typical use
    // and avoids rejection-sampling complexity for small lengths.
    const idx = rnd[i] % alphabetLen;
    out += alphabet.charAt(idx);
  }

  return out;
}

/**
 * Generate multiple unique invite codes.
 * Tries to avoid collisions by using a Set and a bounded number of attempts.
 *
 * @param count - how many unique codes to generate
 * @param length - length of each code
 * @param alphabet - optional alphabet to use
 * @returns array of unique invite codes
 */
export function generateInviteCodes(
  count: number,
  length = 8,
  alphabet = DEFAULT_ALPHABET,
): string[] {
  if (!Number.isInteger(count) || count <= 0) {
    throw new TypeError('count must be a positive integer');
  }
  const codes = new Set<string>();
  const maxAttempts = Math.max(1000, count * 10);
  let attempts = 0;
  while (codes.size < count && attempts < maxAttempts) {
    codes.add(generateInviteCode(length, alphabet));
    attempts++;
  }
  if (codes.size < count) {
    throw new Error(
      `Unable to generate ${count} unique codes within ${maxAttempts} attempts`,
    );
  }
  return Array.from(codes);
}
