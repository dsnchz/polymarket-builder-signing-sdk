/**
 * Browser crypto utilities using Web Crypto API
 * This module should only be imported in browser environments
 */

export const createHmac = async (secret: string, message: string): Promise<string> => {
  // Decode base64 secret
  const binarySecret = Uint8Array.from(atob(secret), (c) => c.charCodeAt(0));

  // Import the key
  const key = await window.crypto.subtle.importKey(
    "raw",
    binarySecret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  // Create message buffer
  const encoder = new TextEncoder();
  const messageBuffer = encoder.encode(message);

  // Sign the message
  const signature = await window.crypto.subtle.sign("HMAC", key, messageBuffer);

  // Convert to base64
  const signatureArray = new Uint8Array(signature);
  let binary = "";

  for (let i = 0; i < signatureArray.byteLength; i++) {
    binary += String.fromCharCode(signatureArray[i]!);
  }

  return btoa(binary);
};
