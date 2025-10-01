import "mocha";
import { expect } from "chai";
import { BuilderApiKeyCreds, BuilderConfig } from "../src";

describe("builder config", () => {
    it("isValid", () => {
        let builderConfig: BuilderConfig;
        const creds: BuilderApiKeyCreds = {
            key: "019894b9-cb40-79c4-b2bd-6aecb6f8c6c5",
            secret: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
            passphrase: "1816e5ed89518467ffa78c65a2d6a62d240f6fd6d159cba7b2c4dc510800f75a",
        }
        // isValid false
        builderConfig = new BuilderConfig();
        
        // isValid true
        builderConfig = new BuilderConfig({localBuilderCreds: creds});
        expect(builderConfig.isValid()).true;
    });
});
