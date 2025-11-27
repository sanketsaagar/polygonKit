# PolygonKit Deployment Guide

This guide shows you how to deploy PolygonKit so anyone can use it.

## Option 1: Publish to NPM (Recommended)

This allows users to install with: `npm install @sanketsaagar/polygon-kit`

### Prerequisites

1. Create an NPM account at https://www.npmjs.com/signup
2. If publishing under `@polygon` scope, you need access to the Polygon organization on NPM

### Steps

```bash
# 1. Login to NPM
npm login

# 2. Build the library
pnpm build

# 3. Test the package locally (optional)
npm pack  # Creates a .tgz file
# Test in another project: npm install /path/to/polygon-kit-0.1.0.tgz

# 4. Publish to NPM
npm publish --access public

# For scoped packages (@sanketsaagar/polygon-kit)
# You may need to specify the scope access
```

### Update Package Name (If Needed)

If you don't have access to `@polygon` scope, update `package.json`:

```json
{
  "name": "polygon-chain-kit",  // Instead of @sanketsaagar/polygon-kit
  // ... rest of config
}
```

Then users install with: `npm install polygon-chain-kit`

---

## Option 2: GitHub + NPM

Push to GitHub first, then publish to NPM.

### Step 1: Push to GitHub

```bash
# 1. Create a new repository on GitHub
# Go to: https://github.com/new
# Name it: polygon-kit
# Don't initialize with README (we already have one)

# 2. Add the remote
git remote add origin https://github.com/YOUR_USERNAME/polygon-kit.git

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: PolygonKit v0.1.0

- 13 production-ready React components
- 3 powerful hooks for Polygon interactions
- Complete TypeScript support
- Comprehensive documentation (4,400+ lines)
- Support for Polygon PoS, zkEVM, and Amoy testnet"

# 5. Push to GitHub
git push -u origin main
```

### Step 2: Update package.json with GitHub info

```json
{
  "name": "@sanketsaagar/polygon-kit",
  "version": "0.1.0",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR_USERNAME/polygon-kit.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/polygon-kit/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/polygon-kit#readme"
}
```

### Step 3: Publish to NPM

```bash
npm publish --access public
```

---

## Option 3: Install from GitHub Directly

Users can install directly from GitHub without NPM:

```bash
npm install github:YOUR_USERNAME/polygon-kit
```

Or with a specific version/tag:

```bash
npm install github:YOUR_USERNAME/polygon-kit#v0.1.0
```

---

## Option 4: Create a Template Repository

Make it easy for users to start new projects.

### 1. Create a template repo on GitHub

- Go to repository settings
- Check "Template repository"

### 2. Users can create projects with:

```bash
# Using GitHub CLI
gh repo create my-polygon-app --template YOUR_USERNAME/polygon-kit

# Or click "Use this template" button on GitHub
```

---

## Option 5: Create a CLI Tool (Like create-react-app)

For the best developer experience (like OnchainKit), create a CLI tool.

### Create `create-polygon-app` package

Create a new directory: `create-polygon-app/`

**package.json:**

```json
{
  "name": "create-polygon-app",
  "version": "1.0.0",
  "bin": {
    "create-polygon-app": "./bin/create-polygon-app.js"
  },
  "dependencies": {
    "prompts": "^2.4.2"
  }
}
```

**bin/create-polygon-app.js:**

```javascript
#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectName = process.argv[2] || 'my-polygon-app';

console.log(`Creating a new Polygon app in ${projectName}...`);

// Create Vite project
execSync(`npm create vite@latest ${projectName} -- --template react-ts`, {
  stdio: 'inherit',
});

// Navigate into project
process.chdir(projectName);

// Install dependencies
console.log('\nInstalling PolygonKit and dependencies...');
execSync('npm install @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query', {
  stdio: 'inherit',
});

// Install TailwindCSS
console.log('\nInstalling TailwindCSS...');
execSync('npm install -D tailwindcss postcss autoprefixer', {
  stdio: 'inherit',
});
execSync('npx tailwindcss init -p', { stdio: 'inherit' });

// Create example files
console.log('\nCreating example files...');

// ... (add file creation logic)

console.log('\n✅ Success! Your Polygon app is ready.');
console.log('\nRun the following commands to get started:');
console.log(`\n  cd ${projectName}`);
console.log('  npm run dev');
```

Then publish:

```bash
cd create-polygon-app
npm publish
```

Users can then run:

```bash
npm create polygon-app my-app
# or
npx create-polygon-app my-app
```

---

## Recommended Deployment Strategy

For the best experience, I recommend this approach:

### Phase 1: GitHub (Now)
1. Push to GitHub
2. Get feedback from community
3. Iterate on features

### Phase 2: NPM (After testing)
1. Publish to NPM as `polygon-chain-kit` or get `@polygon` scope
2. Users install with `npm install polygon-chain-kit`

### Phase 3: CLI Tool (Optional, later)
1. Create `create-polygon-app` CLI
2. Publish to NPM
3. Users create projects with `npm create polygon-app`

---

## Quick Start: GitHub Deployment

Here's what to do right now:

```bash
# 1. Create GitHub repo at: https://github.com/new

# 2. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/polygon-kit.git

# 3. Add all files
git add .

# 4. Commit
git commit -m "feat: Initial release of PolygonKit

Complete chain kit for Polygon with:
- 13 React components
- 3 hooks
- Full TypeScript support
- 4,400+ lines of documentation"

# 5. Push
git push -u origin main

# 6. Create a release on GitHub
# Go to: https://github.com/YOUR_USERNAME/polygon-kit/releases/new
# Tag: v0.1.0
# Title: PolygonKit v0.1.0 - Initial Release
```

Then users can install with:

```bash
npm install github:YOUR_USERNAME/polygon-kit
```

---

## After GitHub Upload

### Update README.md Installation

Add this to the top of README.md:

```markdown
## Installation

### From GitHub (Current)

```bash
npm install github:YOUR_USERNAME/polygon-kit
```

### From NPM (Coming Soon)

```bash
npm install @sanketsaagar/polygon-kit
```

---

## Publishing to NPM

When ready to publish to NPM:

### 1. Update package.json

```json
{
  "name": "@sanketsaagar/polygon-kit",
  "version": "0.1.0",
  "description": "React components and TypeScript utilities for building onchain apps on Polygon",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/YOUR_USERNAME/polygon-kit.git"
  },
  "keywords": [
    "polygon",
    "web3",
    "ethereum",
    "blockchain",
    "react",
    "wagmi",
    "dapp",
    "crypto",
    "wallet"
  ]
}
```

### 2. Test before publishing

```bash
# Build
pnpm build

# Pack locally
npm pack

# Test in another project
cd ../test-project
npm install ../polygon-kit/polygon-polygon-kit-0.1.0.tgz
```

### 3. Publish

```bash
# Login
npm login

# Publish
npm publish --access public

# Or for scoped package
npm publish --access public --scope @polygon
```

### 4. Verify

```bash
npm info @sanketsaagar/polygon-kit
```

---

## Version Management

Use semantic versioning:

```bash
# Patch release (0.1.0 -> 0.1.1)
npm version patch

# Minor release (0.1.0 -> 0.2.0)
npm version minor

# Major release (0.1.0 -> 1.0.0)
npm version major

# Then publish
npm publish --access public
```

---

## CI/CD (Optional)

Set up GitHub Actions for automatic publishing:

**.github/workflows/publish.yml:**

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: https://registry.npmjs.org/
      - run: npm install
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

---

## Summary

**Easiest path to get started:**

1. **Now**: Push to GitHub → Users install from GitHub
2. **Soon**: Publish to NPM → Users install from NPM
3. **Later**: Create CLI tool → Users scaffold with one command

**Next immediate steps:**

```bash
# 1. Create GitHub repo
# 2. Run these commands:
git add .
git commit -m "feat: Initial release"
git remote add origin https://github.com/YOUR_USERNAME/polygon-kit.git
git push -u origin main
```

Then share: `npm install github:YOUR_USERNAME/polygon-kit` 🚀
