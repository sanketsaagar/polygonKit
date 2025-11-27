# PolygonKit

> React components and TypeScript utilities for building full-fledged onchain apps on Polygon

PolygonKit is a comprehensive React library inspired by OnchainKit, specifically designed for building web3 applications on Polygon. It provides battle-tested components, hooks, and utilities to create seamless onchain experiences.

## Features

- **Wallet Management** - Easy wallet connection and account management
- **Identity Components** - Display user profiles with ENS support
- **Transaction Handling** - Simplified transaction building and tracking
- **Token Operations** - Token display, balance tracking, and swaps
- **TypeScript First** - Full type safety with TypeScript
- **Customizable** - Fully customizable components with TailwindCSS
- **Multi-Chain** - Support for Polygon PoS, zkEVM, and testnets

## Installation

### Install from NPM (Recommended)

```bash
npm install @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query
```

or

```bash
yarn add @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query
```

or

```bash
pnpm add @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query
```

### Install from GitHub

```bash
npm install github:sanketsaagar/polygonKit wagmi viem @tanstack/react-query
```

## Quick Start

### 1. Wrap your app with PolygonKitProvider

```tsx
import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';

function App() {
  return (
    <PolygonKitProvider>
      <YourApp />
    </PolygonKitProvider>
  );
}
```

### 2. Use Wallet Components

```tsx
import { Wallet, ConnectWallet, WalletDropdown } from '@sanketsaagar/polygon-kit';

function Header() {
  return (
    <Wallet>
      <ConnectWallet />
      <WalletDropdown />
    </Wallet>
  );
}
```

### 3. Display User Identity

```tsx
import { Identity } from '@sanketsaagar/polygon-kit';

function UserProfile({ address }) {
  return (
    <Identity
      address={address}
      showAvatar
      showAddress
      showBalance
    />
  );
}
```

## Component API

### Wallet Components

#### `<ConnectWallet />`

Button component for connecting/disconnecting wallet.

```tsx
<ConnectWallet
  onConnect={(address) => console.log('Connected:', address)}
  onDisconnect={() => console.log('Disconnected')}
  className="custom-class"
/>
```

**Props:**
- `onConnect?: (address: Address) => void` - Callback when wallet connects
- `onDisconnect?: () => void` - Callback when wallet disconnects
- `className?: string` - Custom CSS classes
- `children?: ReactNode` - Custom render content

#### `<WalletDropdown />`

Dropdown menu showing account details and network switching.

```tsx
<WalletDropdown className="custom-class" />
```

**Props:**
- `className?: string` - Custom CSS classes
- `children?: ReactNode` - Custom trigger content

### Identity Components

#### `<Identity />`

Display user identity with avatar, name, and balance.

```tsx
<Identity
  address="0x..."
  showAvatar={true}
  showAddress={true}
  showBalance={true}
  className="custom-class"
/>
```

**Props:**
- `address: Address` - User wallet address (required)
- `showAvatar?: boolean` - Show avatar (default: true)
- `showAddress?: boolean` - Show address/ENS (default: true)
- `showBalance?: boolean` - Show balance (default: false)
- `className?: string` - Custom CSS classes

#### `<Avatar />`

Display user avatar with gradient colors.

```tsx
<Avatar address="0x..." size={40} />
```

**Props:**
- `address: Address` - Wallet address (required)
- `size?: number` - Avatar size in pixels (default: 40)
- `className?: string` - Custom CSS classes

#### `<Name />`

Display ENS name or shortened address.

```tsx
<Name address="0x..." />
```

**Props:**
- `address: Address` - Wallet address (required)
- `className?: string` - Custom CSS classes

### Transaction Components

#### `<Transaction />`

Wrapper for transaction-related components.

```tsx
<Transaction chainId={137}>
  <TransactionButton
    text="Send Transaction"
    calls={[{ to: '0x...', value: BigInt(1000) }]}
    onSuccess={(hash) => console.log('Success:', hash)}
    onError={(error) => console.log('Error:', error)}
  />
</Transaction>
```

**Props:**
- `chainId?: number` - Required chain ID
- `className?: string` - Custom CSS classes
- `children?: ReactNode` - Child components

#### `<TransactionButton />`

Button to execute transactions.

```tsx
<TransactionButton
  text="Send MATIC"
  calls={[
    {
      to: '0x...',
      value: BigInt(1000000000000000000), // 1 MATIC
      data: '0x...'
    }
  ]}
  onSuccess={(hash) => console.log('Transaction:', hash)}
  onError={(error) => console.error(error)}
/>
```

**Props:**
- `text?: string` - Button text (default: 'Send Transaction')
- `calls?: TransactionCall[]` - Array of transaction calls
- `onSuccess?: (hash: string) => void` - Success callback
- `onError?: (error: Error) => void` - Error callback
- `disabled?: boolean` - Disable button
- `className?: string` - Custom CSS classes

#### `<TransactionStatus />`

Display transaction confirmation status.

```tsx
<TransactionStatus hash="0x..." />
```

**Props:**
- `hash: Hash` - Transaction hash (required)
- `className?: string` - Custom CSS classes

### Token Components

#### `<Token />`

Display token information.

```tsx
<Token
  address="0x..."
  symbol="MATIC"
  amount="1.5"
  className="custom-class"
/>
```

**Props:**
- `address: Address` - Token address (required)
- `symbol?: string` - Token symbol
- `amount?: string` - Token amount
- `className?: string` - Custom CSS classes

#### `<TokenBalance />`

Display token balance for an address.

```tsx
<TokenBalance
  address="0x..."
  token="0x..." // Optional: ERC20 token address
/>
```

**Props:**
- `address: Address` - Wallet address (required)
- `token?: Address` - Token contract address (optional, shows native if not provided)
- `className?: string` - Custom CSS classes

### Swap Component

#### `<Swap />`

Token swap interface (integrate with your DEX aggregator).

```tsx
<Swap
  onSuccess={(hash) => console.log('Swap success:', hash)}
  onError={(error) => console.error('Swap error:', error)}
  className="custom-class"
/>
```

**Props:**
- `onSuccess?: (hash: string) => void` - Success callback
- `onError?: (error: Error) => void` - Error callback
- `className?: string` - Custom CSS classes

## Hooks

### `usePolygonKit()`

Main hook for wallet interactions.

```tsx
import { usePolygonKit } from '@sanketsaagar/polygon-kit';

function Component() {
  const { address, isConnected, chain, balance, connect, disconnect } = usePolygonKit();

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

**Returns:**
- `address?: Address` - Connected wallet address
- `isConnected: boolean` - Connection status
- `chain?: Chain` - Current chain
- `balance?: { value: bigint, symbol: string }` - Native token balance
- `connect: () => void` - Connect wallet function
- `disconnect: () => void` - Disconnect wallet function
- `connectors: Connector[]` - Available connectors

### `usePolygonBalance()`

Get token balance with formatting.

```tsx
import { usePolygonBalance } from '@sanketsaagar/polygon-kit';

function Component({ address }) {
  const { balance, formatted, symbol, isLoading } = usePolygonBalance(address);

  if (isLoading) return <div>Loading...</div>;

  return <div>{formatted} {symbol}</div>;
}
```

**Parameters:**
- `address?: Address` - Wallet address
- `token?: Address` - Token contract address (optional)

**Returns:**
- `balance?: bigint` - Raw balance
- `formatted: string` - Formatted balance
- `symbol?: string` - Token symbol
- `decimals?: number` - Token decimals
- `isLoading: boolean` - Loading state
- `isError: boolean` - Error state
- `refetch: () => void` - Refetch function

### `usePolygonTransaction()`

Send transactions with status tracking.

```tsx
import { usePolygonTransaction } from '@sanketsaagar/polygon-kit';

function Component() {
  const { send, hash, isPending, isConfirming, isSuccess } = usePolygonTransaction();

  const handleSend = () => {
    send('0x...', BigInt(1000000000000000000)); // Send 1 MATIC
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isPending}>
        Send
      </button>
      {isConfirming && <div>Confirming...</div>}
      {isSuccess && <div>Success! Hash: {hash}</div>}
    </div>
  );
}
```

**Returns:**
- `send: (to: Address, value?: bigint, data?: Hex) => void` - Send transaction
- `hash?: Hash` - Transaction hash
- `isPending: boolean` - Transaction pending
- `isConfirming: boolean` - Waiting for confirmation
- `isSuccess: boolean` - Transaction succeeded
- `isError: boolean` - Transaction failed
- `error?: Error` - Error details

## Utilities

### Format Utilities

```tsx
import {
  shortenAddress,
  formatBalance,
  parseTokenAmount
} from '@sanketsaagar/polygon-kit';

// Shorten address: 0x1234...5678
const short = shortenAddress('0x1234567890123456789012345678901234567890');

// Format balance: 1.5000
const formatted = formatBalance(BigInt('1500000000000000000'), 18, 4);

// Parse amount: 1500000000000000000n
const parsed = parseTokenAmount('1.5', 18);
```

## Chain Constants

```tsx
import { polygon, polygonAmoy, polygonZkEVM } from '@sanketsaagar/polygon-kit';

console.log(polygon.id); // 137
console.log(polygonAmoy.id); // 80002
console.log(polygonZkEVM.id); // 1101
```

## Styling

PolygonKit components use TailwindCSS classes by default. You can:

1. **Override with className**: Pass custom classes to any component
2. **Use custom children**: Provide your own UI as children
3. **Theme support**: Components respect dark mode via `dark:` classes

## Example: Complete App

```tsx
import {
  PolygonKitProvider,
  Wallet,
  ConnectWallet,
  WalletDropdown,
  Identity,
  TransactionButton,
  Swap,
  usePolygonKit,
} from '@sanketsaagar/polygon-kit';

function Dashboard() {
  const { address, isConnected } = usePolygonKit();

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ConnectWallet />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Polygon App</h1>
        <Wallet>
          <WalletDropdown />
        </Wallet>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl">
          <Identity
            address={address!}
            showAvatar
            showAddress
            showBalance
          />
        </div>

        <Swap />
      </div>
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

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Watch mode for development
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## License

MIT

---

Built with ❤️ for the Polygon ecosystem
