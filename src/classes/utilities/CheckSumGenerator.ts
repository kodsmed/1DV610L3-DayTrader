/**
 * Takes a string and returns an 16 byte checksum of the string.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
 *
 * @param data - a string to be check-summed, probably a JSON string
 * @returns Promise<string> - a 16 byte checksum of the string
 */
export async function generateChecksum(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}