# Path Comment

Adds a comment with the file's relative path to the top of supported files on open, save, or on command.  
This helps track file origin when copying code, similar to how ChatGPT formats code examples.

## Features

- Automatically inserts or updates the relative path comment:
  - When a file is **opened**
  - When a file is **saved**
  - When triggered **manually via Command Palette**
- Adds an empty line after the comment for clarity
- Supports multiple languages with proper comment prefixes (e.g. `//`, `#`, `--`)
- Skips file types that don't support comments (e.g. `.md`, `.html`)

## Example

If you're editing a file at `src/utils/helpers.tsx`, the first two lines will become:

```tsx
// src/utils/helpers.tsx

export function doSomething() {
  // ...
}
```

## Supported Languages

- `//` — JavaScript, TypeScript, JSX, TSX, Java, C, C++, PHP, Kotlin, Swift, etc.
- `#` — Python, Ruby, Shell, YAML, etc.
- `--` — SQL, Lua
- `;` — INI

## Manual Usage

You can run the command manually anytime:

1. Press `⌘ + ⇧ + P` (Mac) or `Ctrl + Shift + P` (Windows/Linux)
2. Type: **Insert Path Comment**
3. Hit Enter

The comment will be inserted or updated at the top of the active editor.

## Extension Settings

This extension currently works automatically and doesn't require configuration.

## Release Notes

### 1.0.2

- Added support for `.tsx` and `.jsx` files

### 1.0.1

- Fixed missing icon on Marketplace

### 1.0.0

- Initial release
- Adds comment with relative file path on open/save or via Command Palette
- Detects appropriate comment prefix by language
- Skips unsupported file types

## 💻 Source Code

[GitHub Repository](https://github.com/xfanta/vscode-path-comment)
