import { BuilderApiKeyCreds } from "./types";

export class BuilderConfig {
    public remoteBuilderSignerUrl?: string;
    public localBuilderCreds?: BuilderApiKeyCreds;

    constructor(config?: { 
        remoteBuilderSignerUrl?: string; 
        localBuilderCreds?: BuilderApiKeyCreds; 
    }) {
        if (config) {
            this.remoteBuilderSignerUrl = config.remoteBuilderSignerUrl;
            this.localBuilderCreds = config.localBuilderCreds;
        }
    }

    public isValid(): boolean {
        return (
            (this.localBuilderCreds !== undefined) ||
            (
                this.remoteBuilderSignerUrl !== undefined &&
                this.remoteBuilderSignerUrl.length > 0
            )
        );
    }
}
