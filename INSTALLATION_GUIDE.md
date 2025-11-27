# PolygonKit Installation Guide

Complete guide for installing and using PolygonKit in your project.

## ✅ Current Installation (Works Now!)

Users can install PolygonKit directly from GitHub:

```bash
npm install github:sanketsaagar/polygonKit wagmi viem @tanstack/react-query
```

## 🚀 Quick Start for Users

### Step 1: Create a new React project

```bash
npm create vite@latest my-polygon-app -- --template react-ts
cd my-polygon-app
```

### Step 2: Install PolygonKit

```bash
npm install github:sanketsaagar/polygonKit wagmi viem @tanstack/react-query
```

### Step 3: Install TailwindCSS (optional but recommended)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Set up the provider

Update `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PolygonKitProvider>
      <App />
    </PolygonKitProvider>
  </React.StrictMode>,
);
```

### Step 5: Use PolygonKit components

Update `src/App.tsx`:

```tsx
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  Identity,
  usePolygonKit,
} from '@sanketsaagar/polygon-kit';

function App() {
  const { address, isConnected } = usePolygonKit();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Polygon App</h1>
          <Wallet>
            {isConnected ? <WalletDropdown /> : <ConnectWallet />}
          </Wallet>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isConnected && address ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <Identity
              address={address}
              showAvatar
              showAddress
              showBalance
            />
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to Polygon</h2>
            <ConnectWallet />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
```

### Step 6: Run your app

```bash
npm run dev
```

Visit `http://localhost:5173` and connect your wallet!

---

## 📦 Publishing to NPM (For Maintainers)

When ready to publish to NPM registry:

### Prerequisites

1. Create an NPM account at https://www.npmjs.com/signup
2. Decide on package name:
   - `@sanketsaagar/polygon-kit` (requires Polygon org access)
   - `polygon-chain-kit` (available public name)

### Steps to Publish

```bash
# 1. Login to NPM
npm login

# 2. Update package name if needed (in package.json)
# If you don't have @polygon scope access:
{
  "name": "polygon-chain-kit",  // instead of @sanketsaagar/polygon-kit
  ...
}

# 3. Build the library
pnpm build

# 4. Test the package locally (optional)
npm pack
# This creates: polygon-polygon-kit-0.1.0.tgz or polygon-chain-kit-0.1.0.tgz

# 5. Test in another project
cd ../test-project
npm install ../polygon-kit/polygon-chain-kit-0.1.0.tgz

# 6. If tests pass, publish!
cd ../polygon-kit
npm publish --access public
```

### After Publishing to NPM

Update installation instructions in README.md:

```markdown
## Installation

```bash
npm install polygon-chain-kit wagmi viem @tanstack/react-query
```

Then users can import:

```tsx
import { PolygonKitProvider, ConnectWallet } from 'polygon-chain-kit';
```

---

## 🎯 Creating a GitHub Release (Recommended)

To make installation easier, create a release on GitHub:

### Step 1: Create a Git Tag

```bash
git tag -a v0.1.0 -m "Release v0.1.0: Initial release of PolygonKit"
git push origin v0.1.0
```

### Step 2: Create Release on GitHub

1. Go to: https://github.com/sanketsaagar/polygonKit/releases/new
2. Choose tag: `v0.1.0`
3. Release title: `PolygonKit v0.1.0 - Initial Release`
4. Description:

```markdown
# PolygonKit v0.1.0 🚀

Complete chain kit for building Polygon dApps, inspired by OnchainKit.

## ✨ What's Included

- **13 Production-Ready Components**: Wallet, Identity, Transaction, Token, Swap
- **3 Powerful Hooks**: usePolygonKit, usePolygonBalance, usePolygonTransaction
- **Full TypeScript Support**: 100% type-safe with comprehensive type definitions
- **Multi-Chain Support**: Polygon PoS, zkEVM, Amoy testnet
- **4,400+ Lines of Documentation**: Complete guides and API references

## 📦 Installation

```bash
npm install github:sanketsaagar/polygonKit@v0.1.0 wagmi viem @tanstack/react-query
```

## 📚 Documentation

- [Quick Start](./QUICKSTART.md)
- [Complete Guide](./GETTING_STARTED.md)
- [API Reference](./API_REFERENCE.md)
- [Examples](./examples/)

## 🎯 Features

✅ Wallet connection and management
✅ User identity and profiles
✅ Transaction handling
✅ Token operations
✅ Swap interface
✅ Dark mode support
✅ Fully customizable with TailwindCSS

Built with ❤️ for the Polygon ecosystem.
```

### Step 3: Users Install with Version

```bash
npm install github:sanketsaagar/polygonKit#v0.1.0
```

---

## 🛠️ Alternative Installation Methods

### Method 1: Direct GitHub URL

```bash
npm install https://github.com/sanketsaagar/polygonKit.git
```

### Method 2: GitHub with branch

```bash
npm install github:sanketsaagar/polygonKit#main
```

### Method 3: Local installation (for testing)

```bash
# From the polygon-kit directory
npm pack

# In your test project
npm install /path/to/polygon-kit/polygon-polygon-kit-0.1.0.tgz
```

---

## 📋 Version Management

When releasing new versions:

```bash
# Patch release (0.1.0 -> 0.1.1)
npm version patch

# Minor release (0.1.0 -> 0.2.0)
npm version minor

# Major release (0.1.0 -> 1.0.0)
npm version major

# This will:
# 1. Update version in package.json
# 2. Create a git commit
# 3. Create a git tag

# Push changes and tags
git push && git push --tags
```

---

## 🔧 Troubleshooting

### Issue: Cannot find module '@sanketsaagar/polygon-kit'

**Solution**: Make sure you installed from GitHub:
```bash
npm install github:sanketsaagar/polygonKit
```

### Issue: TypeScript errors

**Solution**: Ensure your `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Issue: Wagmi/Viem version conflicts

**Solution**: Install peer dependencies:
```bash
npm install wagmi@^2.0.0 viem@^2.0.0
```

---

## 📊 Package Information

- **GitHub**: https://github.com/sanketsaagar/polygonKit
- **Current Version**: 0.1.0
- **License**: MIT
- **Built Size**: ~53KB (25KB CJS + 22KB ESM + 6KB types)

---

## 🎉 Summary

**Current Setup:**
✅ Hosted on GitHub
✅ Users can install with: `npm install github:sanketsaagar/polygonKit`
✅ All 13 components ready to use
✅ Complete documentation included

**Next Steps (Optional):**
- [ ] Publish to NPM for easier installation
- [ ] Create releases for version management
- [ ] Add CI/CD for automated publishing
- [ ] Create a CLI tool (create-polygon-app)

**For any issues or questions:**
- Open an issue: https://github.com/sanketsaagar/polygonKit/issues
- Read docs: https://github.com/sanketsaagar/polygonKit#readme
