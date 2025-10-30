# Polymarket Builder Signing SDK (@dschz)

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![npm](https://img.shields.io/npm/v/@dschz/polymarket-builder-signing-sdk?color=blue)](https://www.npmjs.com/package/@dschz/polymarket-builder-signing-sdk)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@dschz/polymarket-builder-signing-sdk)](https://bundlephobia.com/package/@dschz/polymarket-builder-signing-sdk)
[![CI](https://github.com/dsnchz/polymarket-builder-signing-sdk/actions/workflows/ci.yaml/badge.svg)](https://github.com/dsnchz/polymarket-builder-signing-sdk/actions/workflows/ci.yaml)

Fork of [Polymarket Builder Signing SDK](https://github.com/Polymarket/builder-signing-sdk).

A TypeScript SDK for creating authenticated builder headers

## Installation

```bash
pnpm install @dschz/polymarket-builder-signing-sdk
```

## Quick Start

```typescript
import { BuilderSigner } from '@dschz/polymarket-builder-signing-sdk';

// Create a builder config for signing

// Local
const builderConfig = new BuilderConfig(
  {
    localBuilderCreds: {
      key: "xxxxxxx-xxx-xxxx-xxx-xxxxxxxxx",
      secret: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      passphrase: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
  },
);

const headers = await builderConfig.generateBuilderHeaders(
  'POST'                   // HTTP method
  '/order',               // API endpoint path
  '{"marketId": "0x123"}' // Request body
);

// Remote
const builderConfig = new BuilderConfig(
  {
    remoteBuilderConfig: {
      url: remoteSignerUrl,
      token: `${process.env.MY_AUTH_TOKEN}`
    }
  },
);

const headers = await builderConfig.generateBuilderHeaders(
  'POST'                   // HTTP method
  '/order',               // API endpoint path
  '{"marketId": "0x123"}' // Request body
);
```
