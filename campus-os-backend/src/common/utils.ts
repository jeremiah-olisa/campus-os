// This file contains helpful utility functions that can be used anywhere in our app
// Like a toolbox with useful tools

import { randomBytes } from 'crypto'; // Import secure random number generator from Node.js

// This is our alphabet - letters and numbers that are easy to read and tell apart
// We avoid confusing characters like 0/O or 1/l
const DEFAULT_ALPHABET =
  'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

/**
 * Create one random invite code for new users
 * Like generating a unique password or access code
 *
 * @param length - How many characters long the code should be (default 8)
 * @param alphabet - What characters to use (optional)
 * @returns A random string like "aB3kP9mZ"
 */
export function generateInviteCode(
  length = 8, // Default length is 8 characters
  alphabet = DEFAULT_ALPHABET, // Use our default alphabet
): string {
  // Check if length is a valid positive number
  if (!Number.isInteger(length) || length <= 0) {
    throw new TypeError('length must be a positive integer');
  }
  // Check if alphabet is valid
  if (!alphabet || typeof alphabet !== 'string' || alphabet.length < 2) {
    throw new TypeError('alphabet must be a string with at least 2 characters');
  }

  const alphabetLen = alphabet.length; // How many characters are in our alphabet
  // Get random bytes from the computer (very secure random numbers)
  const rnd = randomBytes(length);
  let out = ''; // This will hold our final code

  // Loop through each position in the code
  for (let i = 0; i < length; i++) {
    // Pick a random character from our alphabet
    const idx = rnd[i] % alphabetLen; // Get a number between 0 and alphabet length
    out += alphabet.charAt(idx); // Add the character at that position
  }

  return out; // Return the completed code
}

/**
 * Create multiple unique invite codes
 * Makes sure no two codes are the same
 *
 * @param count - How many codes to create
 * @param length - How long each code should be
 * @param alphabet - What characters to use (optional)
 * @returns Array of unique codes like ["abc123", "def456", "ghi789"]
 */
export function generateInviteCodes(
  count: number, // How many codes we want
  length = 8, // How long each code should be
  alphabet = DEFAULT_ALPHABET, // What characters to use
): string[] {
  // Check if count is valid
  if (!Number.isInteger(count) || count <= 0) {
    throw new TypeError('count must be a positive integer');
  }

  const codes = new Set<string>(); // Use Set to automatically prevent duplicates
  const maxAttempts = Math.max(1000, count * 10); // Don't try forever
  let attempts = 0; // Count how many times we've tried

  // Keep generating codes until we have enough unique ones
  while (codes.size < count && attempts < maxAttempts) {
    codes.add(generateInviteCode(length, alphabet)); // Add a new code
    attempts++; // Count this attempt
  }

  // If we couldn't generate enough unique codes, throw an error
  if (codes.size < count) {
    throw new Error(
      `Unable to generate ${count} unique codes within ${maxAttempts} attempts`,
    );
  }

  return Array.from(codes); // Convert Set to Array and return
}
