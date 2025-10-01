import { URL } from 'url';

import { BuilderSigner } from "./signer";
import { post } from "./http-helpers";
import { BuilderApiKeyCreds, BuilderHeaderPayload, BuilderType, RemoteSignerPayload } from "./types";

export class BuilderConfig {
    readonly remoteBuilderSignerUrl?: string;
    readonly localBuilderCreds?: BuilderApiKeyCreds;
    readonly signer?: BuilderSigner;

    constructor(config?: { 
        remoteBuilderSignerUrl?: string; 
        localBuilderCreds?: BuilderApiKeyCreds; 
    }) {
        if (config) {
            if (config.remoteBuilderSignerUrl !== undefined) {
                if (!BuilderConfig.hasValidRemoteUrl(config.remoteBuilderSignerUrl)) {
                    throw new Error("invalid remote url!");
                }
                this.remoteBuilderSignerUrl = config.remoteBuilderSignerUrl;
            }
            if (config.localBuilderCreds !== undefined) {
                if (!BuilderConfig.hasValidLocalCreds(config.localBuilderCreds)) {
                    throw new Error("invalid local builder credentials!");
                } 
                this.localBuilderCreds = config.localBuilderCreds;
                this.signer = new BuilderSigner(config.localBuilderCreds);
            }
        }
    }

    /**
     * Helper function to generate builder headers using the configured credential method
     * @param method 
     * @param path 
     * @param body 
     */
    public async generateBuilderHeaders(
        method: string,
        path: string,
        body?: string,
        timestamp?: number,
    ): Promise<BuilderHeaderPayload | undefined> {
        this.ensureValid();

        const builderType = this.getBuilderType();

        if (builderType == BuilderType.LOCAL) {
            return Promise.resolve(this.signer?.createBuilderHeaderPayload(method, path, body, timestamp));
        } 
        
        if (builderType == BuilderType.REMOTE) {
            const url: string = this.remoteBuilderSignerUrl as string;
            // Execute a POST to the remote signer url with the header arguments
            const payload: RemoteSignerPayload = {
                method: method,
                path: path,
                body: body,
                timestamp: timestamp,
            };
            try {
                return await post(url, {data: payload});
            } catch (err) {
                console.error("error calling remote signer", err);
                return undefined;
            }
        }
        return undefined;
    }

    public isValid(): boolean {
        return this.getBuilderType() !== BuilderType.UNAVAILABLE;
    }

    public getBuilderType(): BuilderType {
        const local = this.localBuilderCreds;
        const remote = this.remoteBuilderSignerUrl;
        if (local && remote) {
            // If both present, prefer local
            return BuilderType.LOCAL;
        }
        if (local) {
            return BuilderType.LOCAL;
        }
        if (remote) {
            return BuilderType.REMOTE;
        }
        return BuilderType.UNAVAILABLE;
    }

    private static hasValidLocalCreds(creds?: BuilderApiKeyCreds): boolean {
        if (!creds) return false;
        
        const { key, secret, passphrase } = creds;

        if (!key.trim()) return false;
        
        if (!secret.trim()) return false;
        
        if (!passphrase.trim()) return false;
        
        return true;
    }
    
      private static hasValidRemoteUrl(remoteBuilderSignerUrl?: string): boolean {
          if (!remoteBuilderSignerUrl?.trim()) return false;
          try {
              const url = new URL(remoteBuilderSignerUrl.trim());
              return url.protocol === "http:" || url.protocol === "https:";
          } catch {
              return false;
          }
      }
    
      private ensureValid(): void {
          if (this.getBuilderType() === BuilderType.UNAVAILABLE) {
              throw new Error("invalid builder creds configured!");
          }
      }
}
