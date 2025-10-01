
export interface BuilderApiKeyCreds {
    key: string;
    secret: string;
    passphrase: string;
}

export interface BuilderHeaderPayload {
    POLY_BUILDER_API_KEY: string;
    POLY_BUILDER_TIMESTAMP: string;
    POLY_BUILDER_PASSPHRASE: string;
    POLY_BUILDER_SIGNATURE: string;
}

