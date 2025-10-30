import { describe, expect, it } from "bun:test";

import { buildHmacSignature } from "../signing";

describe("hmac", () => {
  it("buildHmacSignature", () => {
    const signature = buildHmacSignature(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      1000000,
      "test-sign",
      "/orders",
      '{"hash": "0x123"}',
    );
    expect(signature).not.toBeNull();
    expect(signature).not.toBeUndefined();
    expect(signature).not.toBeEmpty();
    expect(signature).toBe("ZwAdJKvoYRlEKDkNMwd5BuwNNtg93kNaR_oU2HrfVvc=");
  });
});
