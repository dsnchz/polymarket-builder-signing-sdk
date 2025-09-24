# builder-signing-sdk

A TypeScript SDK for creating authenticated builder headers


## Installation

```bash
pnpm install @polymarket/builder-signing-sdk
```

## Quick Start

```typescript
import { BuilderSigner } from '@polymarket/builder-signing-sdk';

// Initialize with builder API creds
const signer = new BuilderSigner({
  key: 'your-api-key',
  secret: 'your-base64-secret',
  passphrase: 'your-passphrase'
});

// Create builder payload
const headers = signer.createBuilderHeaderPayload(
  'POST'                   // HTTP method
  '/order',               // API endpoint path
  '{"marketId": "0x123"}' // Request body
);
```