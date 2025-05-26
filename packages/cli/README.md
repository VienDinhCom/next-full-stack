# esmate

`esmate` is a lightweight CLI tool designed to simplify common JavaScript/TypeScript project tasks like formatting,
linting, and running custom task sequences.

## Features

- 🧹 Lint with ESLint
- 🔧 Format code with Prettier
- 🛠️ Define and run custom task sequences (series and parallel)
- ⚡ Fast and minimal configuration

## Usage

### Format Code

Run Prettier to check formatting:

```bash
esmate fmt
```

Automatically fix formatting issues:

```bash
esmate fmt --fix
```

### Lint Code

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

#### ▶️ Series (Sequential Execution)

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
