# Getting Started with PolygonKit

This guide will help you build your first web3 application on Polygon using PolygonKit.

## Prerequisites

- Node.js v18 or higher
- Basic knowledge of React
- A wallet extension (MetaMask, Coinbase Wallet, etc.)

## Installation

### Step 1: Create a new React project

```bash
# Using Vite (recommended)
npm create vite@latest my-polygon-app -- --template react-ts
cd my-polygon-app
```

### Step 2: Install PolygonKit and dependencies

```bash
npm install @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query
```

### Step 3: Install TailwindCSS (optional but recommended)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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

## Building Your First App

### Step 1: Set up the Provider

Update your `src/main.tsx`:

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

### Step 2: Create a Simple Wallet Connection

Update your `src/App.tsx`:

```tsx
import { ConnectWallet, usePolygonKit } from '@sanketsaagar/polygon-kit';

function App() {
  const { address, isConnected } = usePolygonKit();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">My Polygon App</h1>

      {!isConnected ? (
        <ConnectWallet />
      ) : (
        <div className="text-center">
          <p className="mb-4">Connected: {address}</p>
          <ConnectWallet />
        </div>
      )}
    </div>
  );
}

export default App;
```

### Step 3: Run your app

```bash
npm run dev
```

Visit `http://localhost:5173` and connect your wallet!

## Next Steps

### Add User Identity

```tsx
import { Identity } from '@sanketsaagar/polygon-kit';

function App() {
  const { address, isConnected } = usePolygonKit();

  if (!isConnected) {
    return <ConnectWallet />;
  }

  return (
    <div>
      <Identity
        address={address!}
        showAvatar
        showAddress
        showBalance
      />
    </div>
  );
}
```

### Add Transaction Capability

```tsx
import { TransactionButton } from '@sanketsaagar/polygon-kit';

function SendTransaction() {
  return (
    <TransactionButton
      text="Send 0.001 MATIC"
      calls={[
        {
          to: '0xRecipientAddress',
          value: BigInt('1000000000000000'), // 0.001 MATIC in wei
        },
      ]}
      onSuccess={(hash) => alert(`Success! Hash: ${hash}`)}
      onError={(error) => alert(`Error: ${error.message}`)}
    />
  );
}
```

### Add Token Swap

```tsx
import { Swap } from '@sanketsaagar/polygon-kit';

function SwapInterface() {
  return (
    <Swap
      onSuccess={(hash) => console.log('Swap completed:', hash)}
      onError={(error) => console.error('Swap failed:', error)}
    />
  );
}
```

### Complete Example with Dashboard

```tsx
import {
  PolygonKitProvider,
  ConnectWallet,
  WalletDropdown,
  Identity,
  TokenBalance,
  TransactionButton,
  Swap,
  usePolygonKit,
} from '@sanketsaagar/polygon-kit';

function Dashboard() {
  const { address, isConnected, chain } = usePolygonKit();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome</h1>
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
            <WalletDropdown />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <Identity
              address={address!}
              showAvatar
              showAddress
              showBalance
            />
          </div>

          {/* Balance Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Balance</h2>
            <TokenBalance address={address!} />
          </div>

          {/* Transaction Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Quick Send</h2>
            <TransactionButton
              text="Send Test Transaction"
              calls={[{ to: address!, value: BigInt(0) }]}
              onSuccess={(hash) => alert(`Sent! ${hash}`)}
              className="w-full"
            />
          </div>

          {/* Swap Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <Swap />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <PolygonKitProvider>
      <Dashboard />
    </PolygonKitProvider>
  );
}

export default App;
```

## Using Hooks

### usePolygonKit()

Access wallet state and methods:

```tsx
import { usePolygonKit } from '@sanketsaagar/polygon-kit';

function MyComponent() {
  const {
    address,       // Current wallet address
    isConnected,   // Connection status
    chain,         // Current chain info
    balance,       // Native token balance
    connect,       // Connect function
    disconnect,    // Disconnect function
  } = usePolygonKit();

  return (
    <div>
      {isConnected ? (
        <button onClick={disconnect}>Disconnect</button>
      ) : (
        <button onClick={connect}>Connect</button>
      )}
    </div>
  );
}
```

### usePolygonBalance()

Get formatted token balance:

```tsx
import { usePolygonBalance } from '@sanketsaagar/polygon-kit';

function BalanceDisplay({ address }) {
  const { formatted, symbol, isLoading } = usePolygonBalance(address);

  if (isLoading) return <div>Loading...</div>;

  return <div>{formatted} {symbol}</div>;
}
```

### usePolygonTransaction()

Send transactions programmatically:

```tsx
import { usePolygonTransaction } from '@sanketsaagar/polygon-kit';

function SendButton() {
  const { send, isPending, isSuccess, hash } = usePolygonTransaction();

  const handleSend = () => {
    send(
      '0xRecipientAddress',
      BigInt('1000000000000000000') // 1 MATIC
    );
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isPending}>
        {isPending ? 'Sending...' : 'Send MATIC'}
      </button>
      {isSuccess && <p>Success! Hash: {hash}</p>}
    </div>
  );
}
```

## Configuration

### Custom Chains

```tsx
import { PolygonKitProvider, polygon, polygonAmoy } from '@sanketsaagar/polygon-kit';

function App() {
  return (
    <PolygonKitProvider
      config={{
        chains: [polygon, polygonAmoy],
      }}
    >
      <YourApp />
    </PolygonKitProvider>
  );
}
```

### Custom RPC URLs

```tsx
import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';

const customPolygon = {
  ...polygon,
  rpcUrls: {
    default: { http: ['https://your-custom-rpc.com'] },
    public: { http: ['https://your-custom-rpc.com'] },
  },
};

function App() {
  return (
    <PolygonKitProvider
      config={{
        chains: [customPolygon],
      }}
    >
      <YourApp />
    </PolygonKitProvider>
  );
}
```

## Styling

PolygonKit components come with default TailwindCSS styling. You can:

### Override with className

```tsx
<ConnectWallet className="bg-blue-500 hover:bg-blue-600 px-8 py-4" />
```

### Use Custom Children

```tsx
<ConnectWallet>
  <button className="my-custom-button">
    Connect to Polygon
  </button>
</ConnectWallet>
```

### Dark Mode

Components support dark mode out of the box:

```tsx
// Toggle dark mode by adding 'dark' class to html element
<html className="dark">
```

## Troubleshooting

### Wallet not connecting

1. Ensure you have a wallet extension installed
2. Check that you're on a supported chain
3. Try refreshing the page

### Transactions failing

1. Check you have enough balance for gas
2. Verify the recipient address is valid
3. Ensure you're on the correct network

### Type errors

Make sure you have TypeScript configured properly:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "node"
  }
}
```

## Next Steps

- Explore the [full API documentation](./README.md)
- Check out the [example applications](./examples)
- Join the [Discord community](https://discord.gg/polygon)
- Read about [Polygon architecture](https://docs.polygon.technology)

## Resources

- [PolygonKit Documentation](./README.md)
- [Polygon Documentation](https://docs.polygon.technology)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)

Happy building! 🚀
