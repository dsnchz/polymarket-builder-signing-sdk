import { buildHmacSignature } from "./hmac";
import type { BuilderApiKeyCreds, BuilderHeaderPayload } from "./types";

export class BuilderSigner {
  readonly creds: BuilderApiKeyCreds;

  constructor(creds: BuilderApiKeyCreds) {
    this.creds = creds;
  }

  public async createBuilderHeaderPayload(
    method: string,
    path: string,
    body?: string,
    timestamp?: number,
  ): Promise<BuilderHeaderPayload> {
    let ts = Math.floor(Date.now() / 1000);
    if (timestamp !== undefined) {
      ts = timestamp;
    }

    const builderSig = await buildHmacSignature(this.creds.secret, ts, method, path, body);

    return {
      POLY_BUILDER_API_KEY: this.creds.key,
      POLY_BUILDER_PASSPHRASE: this.creds.passphrase,
      POLY_BUILDER_SIGNATURE: builderSig,
      POLY_BUILDER_TIMESTAMP: `${ts}`,
    };
  }
}
