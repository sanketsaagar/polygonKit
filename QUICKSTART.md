# PolygonKit Quickstart Guide

Get started with PolygonKit in under 5 minutes!

## Prerequisites

- Node.js 18 or higher
- A wallet extension (MetaMask, Coinbase Wallet, etc.)

## Installation

### Step 1: Create a new project

```bash
# Using Create Vite
npm create vite@latest my-polygon-app -- --template react-ts
cd my-polygon-app
```

### Step 2: Install PolygonKit and dependencies

```bash
npm install @polygon/polygon-kit wagmi viem @tanstack/react-query
```

### Step 3: Install TailwindCSS (recommended)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Quick Setup

### 1. Set up the provider (src/main.tsx)

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolygonKitProvider } from '@polygon/polygon-kit';
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

### 2. Create your first component (src/App.tsx)

```tsx
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  Identity,
  usePolygonKit,
} from '@polygon/polygon-kit';

function App() {
  const { address, isConnected } = usePolygonKit();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Polygon App
          </h1>
          <Wallet>
            {isConnected ? (
              <WalletDropdown />
            ) : (
              <ConnectWallet />
            )}
          </Wallet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isConnected && address ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4">Welcome!</h2>
              <Identity
                address={address}
                showAvatar
                showAddress
                showBalance
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Polygon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Connect your wallet to get started
            </p>
            <ConnectWallet />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
```

### 3. Run your app

```bash
npm run dev
```

Visit `http://localhost:5173` and connect your wallet!

## Common Use Cases

### Add a Send Transaction Button

```tsx
import { TransactionButton } from '@polygon/polygon-kit';

function SendButton() {
  return (
    <TransactionButton
      text="Send 0.001 MATIC"
      calls={[
        {
          to: '0xRecipientAddress',
          value: BigInt('1000000000000000'), // 0.001 MATIC
        },
      ]}
      onSuccess={(hash) => alert(`Transaction sent! Hash: ${hash}`)}
      onError={(error) => alert(`Error: ${error.message}`)}
    />
  );
}
```

### Display Token Balance

```tsx
import { TokenBalance } from '@polygon/polygon-kit';

function BalanceDisplay({ address }) {
  return (
    <div>
      <h3>Your Balance:</h3>
      <TokenBalance address={address} />
    </div>
  );
}
```

### Add Token Swap

```tsx
import { Swap } from '@polygon/polygon-kit';

function SwapWidget() {
  return (
    <Swap
      onSuccess={(hash) => console.log('Swap successful:', hash)}
      onError={(error) => console.error('Swap failed:', error)}
    />
  );
}
```

### Use Hooks for Custom Logic

```tsx
import { usePolygonKit, usePolygonBalance } from '@polygon/polygon-kit';

function CustomComponent() {
  const { address, isConnected, chain } = usePolygonKit();
  const { formatted, symbol } = usePolygonBalance(address);

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div>
      <p>Connected to: {chain?.name}</p>
      <p>Balance: {formatted} {symbol}</p>
    </div>
  );
}
```

## Available Commands

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## Project Structure

```
my-polygon-app/
├── src/
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point with provider
│   └── index.css         # Global styles with Tailwind
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
└── tailwind.config.js    # Tailwind configuration
```

## Component Overview

### Wallet Components
- `<ConnectWallet />` - Connection button
- `<WalletDropdown />` - Account menu
- `<Wallet />` - Container

### Identity Components
- `<Identity />` - Complete profile
- `<Avatar />` - User avatar
- `<Name />` - ENS/address

### Transaction Components
- `<TransactionButton />` - Send transactions
- `<TransactionStatus />` - Track status
- `<Transaction />` - Wrapper

### Token Components
- `<Token />` - Token display
- `<TokenBalance />` - Balance display

### Swap
- `<Swap />` - Token swap interface

## Customization

### Custom Styling

```tsx
<ConnectWallet className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-full" />
```

### Custom Content

```tsx
<ConnectWallet>
  <button className="my-custom-button">
    🔗 Connect to Polygon
  </button>
</ConnectWallet>
```

### Dark Mode

```tsx
// Toggle dark mode by adding 'dark' class to html element
document.documentElement.classList.toggle('dark');
```

## Configuration

### Custom Chains

```tsx
import { PolygonKitProvider, polygon, polygonAmoy } from '@polygon/polygon-kit';

<PolygonKitProvider
  config={{
    chains: [polygon, polygonAmoy],
  }}
>
  <App />
</PolygonKitProvider>
```

### Custom RPC

```tsx
import { PolygonKitProvider } from '@polygon/polygon-kit';

const customPolygon = {
  ...polygon,
  rpcUrls: {
    default: { http: ['https://your-custom-rpc.com'] },
    public: { http: ['https://your-custom-rpc.com'] },
  },
};

<PolygonKitProvider config={{ chains: [customPolygon] }}>
  <App />
</PolygonKitProvider>
```

## Troubleshooting

### Wallet not connecting?

1. Make sure you have MetaMask or another wallet installed
2. Check that you're on a supported network
3. Try refreshing the page

### Build errors?

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type errors?

Make sure your `tsconfig.json` has proper configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx"
  }
}
```

## Next Steps

- **Explore Components**: Check [API_REFERENCE.md](./API_REFERENCE.md)
- **Read Full Docs**: See [README.md](./README.md)
- **View Examples**: Look at [examples/](./examples/)
- **Get Help**: Join [Discord](https://discord.gg/polygon)

## Complete Example

Here's a complete app with all features:

```tsx
// src/App.tsx
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  Identity,
  TransactionButton,
  TokenBalance,
  Swap,
  usePolygonKit,
} from '@polygon/polygon-kit';

function App() {
  const { address, isConnected, chain } = usePolygonKit();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">My Polygon App</h1>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Polygon App</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{chain?.name}</span>
            <Wallet>
              <WalletDropdown />
            </Wallet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Profile */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <Identity
              address={address!}
              showAvatar
              showAddress
              showBalance
            />
          </div>

          {/* Balance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Balance</h2>
            <TokenBalance address={address!} />
          </div>

          {/* Send */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Send Transaction</h2>
            <TransactionButton
              text="Send Test Transaction"
              calls={[{ to: address!, value: BigInt(0) }]}
              onSuccess={(hash) => alert(`Sent! ${hash}`)}
              className="w-full"
            />
          </div>

          {/* Swap */}
          <div className="bg-white p-6 rounded-lg shadow">
            <Swap />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
```

## Resources

- [API Reference](./API_REFERENCE.md) - Complete API documentation
- [Getting Started](./GETTING_STARTED.md) - Detailed tutorial
- [Quick Reference](./QUICK_REFERENCE.md) - Cheat sheet
- [Architecture](./ARCHITECTURE.md) - System design
- [Polygon Docs](https://docs.polygon.technology) - Polygon documentation

---

**Need help?** Check out the [full documentation](./README.md) or join our [Discord community](https://discord.gg/polygon).

Happy building! 🚀
