# builder-signing-sdk

A TypeScript SDK for creating authenticated builder headers


## Installation

```bash
pnpm install @polymarket/builder-signing-sdk
```

## Quick Start

```typescript
import { BuilderSigner } from '@polymarket/builder-signing-sdk';

// Initialize with your API credentials
const signer = new BuilderSigner({
  key: 'your-api-key',
  secret: 'your-base64-secret',
  passphrase: 'your-passphrase'
});

// Create headers for an builder headers for a request
const headers = signer.createBuilderHeaderPayload(
  '{"marketId": "0x123"}', // Request body
  '/order',               // API endpoint path
  'POST'                   // HTTP method
);
```