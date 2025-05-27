# esmate

`esmate` is a lightweight CLI tool designed to simplify common JavaScript/TypeScript project tasks like formatting,
linting, and running custom task sequences.

- 🧹 Lint with ESLint
- 🔧 Format code with Prettier
- 🛠️ Define and run custom task sequences (series and parallel)
- ⚡ Fast and minimal configuration

## Usage

### Format Code

Define your Prettier configuration in a `prettier.config.js` file:

```ts
import { defineConfig } from "esmate/prettier";

export default defineConfig({
  tailwind: {
    tailwindFunctions: ["cn"],
    tailwindStylesheet: "src/global.css",
  },
  ignores: [],
});
```

Run Prettier to format your code:

```bash
esmate fmt
```

Automatically fix formatting issues:

```bash
esmate fmt --fix
```

### Lint Code

Define your ESLint configuration in a `eslintrc.config.js` file:

```ts
import { defineConfig } from "esmate/eslint";

export default defineConfig({
  type: "app",
  react: true,
  ignores: [],
});
```

Run ESLint to check for code issues:

```bash
esmate lint
```

Automatically fix linting issues:

```bash
esmate lint --fix
```

### Task Runner

Tasks are defined in your `package.json` under a `tasks` field.

#### ▶️ Sequential Execution

Run tasks in order, one after another.

**Syntax 1: Single command string**

```json
{
  "tasks": {
    "build": "tsc && vite build"
  }
}
```

**Syntax 2: Array of commands**

```json
{
  "tasks": {
    "build": ["tsc", "vite build"]
  }
}
```

#### 🔀 Parallel Execution

Run multiple tasks at the same time.

```json
{
  "tasks": {
    "build": {
      "scripts": "tsc --watch",
      "styles": "sass --watch input.scss output.css"
    }
  }
}
```
