import { defineConfig } from "tsup";

import pkg from "./package.json";

export default defineConfig({
  name: "polymarket-builder-signing-sdk",
  entry: ["src/index.ts"],
  format: ["esm"],
  bundle: true,
  clean: true,
  dts: {
    footer: `declare module '${pkg.name}'`,
  },
});
