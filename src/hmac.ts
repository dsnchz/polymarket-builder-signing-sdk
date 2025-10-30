import { createHmac } from "./crypto";

function replaceAll(s: string, search: string, replace: string) {
  return s.split(search).join(replace);
}

/**
 * Builds an hmac signature
 * @param signer
 * @param key
 * @param secret
 * @param passphrase
 * @returns string
 */
export const buildHmacSignature = async (
  secret: string,
  timestamp: number,
  method: string,
  requestPath: string,
  body?: string,
): Promise<string> => {
  let message = timestamp + method + requestPath;

  if (body !== undefined) {
    message += body;
  }

  const sig = await createHmac(secret, message);

  // NOTE: Must be url safe base64 encoding, but keep base64 "=" suffix
  // Convert '+' to '-'
  // Convert '/' to '_'
  const sigUrlSafe = replaceAll(replaceAll(sig, "+", "-"), "/", "_");
  return sigUrlSafe;
};
