# @esmate/prettier

Prettier configuration for humans with support for React, Vue, Svelte, Astro, Tailwind CSS, and more.

## Installation

```bash
npm install -D @esmate/prettier prettier
```

If you are using [ESMate CLI](https://www.npmjs.com/package/esmate), it's built-in, so only need to install `prettier`.

## Usage

Define your Prettier configuration in a `prettier.config.js` file:

```ts
import { defineConfig } from "@esmate/prettier";

export default defineConfig({
  // astro: true
  // svelte: true

  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/global.css",
  },
  ignores: [],
});
```

Run Prettier to check your code:

```bash
prettier --check
```

Automatically fix formatting issues:

```bash
prettier --write
```
