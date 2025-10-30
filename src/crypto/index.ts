/**
 * Cross-platform crypto utilities
 * Automatically selects the appropriate implementation based on environment
 */

// Type-only imports to avoid bundling issues
type CryptoModule = {
  createHmac: (secret: string, message: string) => Promise<string>;
};

let cryptoModule: CryptoModule | null = null;

const getCryptoModule = async (): Promise<CryptoModule> => {
  if (cryptoModule) {
    return cryptoModule;
  }

  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

  if (isBrowser) {
    // Dynamic import that won't be included in server bundles
    cryptoModule = await import("./crypto-browser");
  } else {
    // Dynamic import that won't be included in browser bundles when using proper bundler config
    cryptoModule = await import("./crypto-node");
  }

  return cryptoModule;
};

export const createHmac = async (secret: string, message: string): Promise<string> => {
  const crypto = await getCryptoModule();
  return crypto.createHmac(secret, message);
};
