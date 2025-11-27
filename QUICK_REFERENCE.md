# PolygonKit Quick Reference

One-page reference for the most common PolygonKit operations.

## Installation

```bash
npm install @polygon/polygon-kit wagmi viem @tanstack/react-query
```

## Setup

```tsx
import { PolygonKitProvider } from '@polygon/polygon-kit';

<PolygonKitProvider>
  <App />
</PolygonKitProvider>
```

## Components

### Wallet

```tsx
import { Wallet, ConnectWallet, WalletDropdown } from '@polygon/polygon-kit';

// Simple connection
<ConnectWallet />

// With dropdown
<Wallet>
  <ConnectWallet />
  <WalletDropdown />
</Wallet>
```

### Identity

```tsx
import { Identity, Avatar, Name } from '@polygon/polygon-kit';

// Complete profile
<Identity address="0x..." showAvatar showAddress showBalance />

// Just avatar
<Avatar address="0x..." size={48} />

// Just name
<Name address="0x..." />
```

### Transactions

```tsx
import { TransactionButton, TransactionStatus } from '@polygon/polygon-kit';

// Send transaction
<TransactionButton
  text="Send"
  calls={[{ to: '0x...', value: BigInt(1e18) }]}
  onSuccess={(hash) => console.log(hash)}
/>

// Show status
<TransactionStatus hash="0x..." />
```

### Tokens

```tsx
import { Token, TokenBalance } from '@polygon/polygon-kit';

// Display token
<Token address="0x..." symbol="USDC" amount="100" />

// Show balance
<TokenBalance address="0x..." token="0x..." />
```

### Swap

```tsx
import { Swap } from '@polygon/polygon-kit';

<Swap
  onSuccess={(hash) => console.log(hash)}
  onError={(error) => console.error(error)}
/>
```

## Hooks

### usePolygonKit

```tsx
import { usePolygonKit } from '@polygon/polygon-kit';

const {
  address,      // Current address
  isConnected,  // Connection status
  chain,        // Current chain
  balance,      // Native balance
  connect,      // Connect wallet
  disconnect    // Disconnect wallet
} = usePolygonKit();
```

### usePolygonBalance

```tsx
import { usePolygonBalance } from '@polygon/polygon-kit';

const {
  balance,      // Raw balance (bigint)
  formatted,    // Formatted string
  symbol,       // Token symbol
  isLoading,    // Loading state
  refetch       // Refetch function
} = usePolygonBalance(address, tokenAddress);
```

### usePolygonTransaction

```tsx
import { usePolygonTransaction } from '@polygon/polygon-kit';

const {
  send,         // Send function
  hash,         // Transaction hash
  isPending,    // Pending state
  isConfirming, // Confirming state
  isSuccess,    // Success state
  error         // Error object
} = usePolygonTransaction();

// Send transaction
send(toAddress, value, data);
```

## Utilities

```tsx
import {
  shortenAddress,
  formatBalance,
  parseTokenAmount
} from '@polygon/polygon-kit';

// Shorten address
shortenAddress('0x1234...7890'); // '0x1234...7890'

// Format balance
formatBalance(BigInt(1e18), 18, 4); // '1.0000'

// Parse amount
parseTokenAmount('1.5', 18); // 1500000000000000000n
```

## Chains

```tsx
import { polygon, polygonAmoy, polygonZkEVM } from '@polygon/polygon-kit';

// Use in config
<PolygonKitProvider config={{ chains: [polygon, polygonAmoy] }}>
  <App />
</PolygonKitProvider>
```

## Common Patterns

### Complete App Structure

```tsx
import {
  PolygonKitProvider,
  Wallet,
  ConnectWallet,
  WalletDropdown,
  Identity,
  usePolygonKit,
} from '@polygon/polygon-kit';

function Dashboard() {
  const { address, isConnected } = usePolygonKit();

  if (!isConnected) return <ConnectWallet />;

  return (
    <div>
      <Wallet>
        <WalletDropdown />
      </Wallet>
      <Identity address={address} showAvatar showAddress showBalance />
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
```

### Send Native Token

```tsx
import { TransactionButton } from '@polygon/polygon-kit';

<TransactionButton
  text="Send 1 MATIC"
  calls={[{
    to: '0xRecipient...',
    value: BigInt('1000000000000000000') // 1 MATIC in wei
  }]}
  onSuccess={(hash) => alert('Sent! ' + hash)}
/>
```

### Send ERC20 Token

```tsx
import { usePolygonTransaction } from '@polygon/polygon-kit';
import { encodeFunctionData } from 'viem';

const { send } = usePolygonTransaction();

const transferToken = () => {
  const data = encodeFunctionData({
    abi: [{
      name: 'transfer',
      type: 'function',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
    }],
    functionName: 'transfer',
    args: ['0xRecipient...', BigInt(1e18)]
  });

  send('0xTokenAddress...', undefined, data);
};
```

### Check Balance Before Action

```tsx
import { usePolygonBalance } from '@polygon/polygon-kit';

function SendButton({ address }) {
  const { balance, formatted } = usePolygonBalance(address);
  const hasBalance = balance && balance > BigInt(0);

  return (
    <div>
      <p>Balance: {formatted}</p>
      <button disabled={!hasBalance}>
        {hasBalance ? 'Send' : 'Insufficient Balance'}
      </button>
    </div>
  );
}
```

### Network Switching

```tsx
import { useSwitchChain } from 'wagmi';
import { polygon, polygonZkEVM } from '@polygon/polygon-kit';

function NetworkSwitcher() {
  const { switchChain } = useSwitchChain();

  return (
    <div>
      <button onClick={() => switchChain({ chainId: polygon.id })}>
        Switch to Polygon
      </button>
      <button onClick={() => switchChain({ chainId: polygonZkEVM.id })}>
        Switch to zkEVM
      </button>
    </div>
  );
}
```

### Custom Styling

```tsx
// Override default styles
<ConnectWallet className="bg-blue-500 hover:bg-blue-600 px-8 py-4" />

// Custom children
<ConnectWallet>
  <button className="custom-button">
    🔗 Connect to Polygon
  </button>
</ConnectWallet>

// Dark mode support
<Identity
  address={address}
  className="bg-white dark:bg-gray-900"
  showAvatar
  showAddress
/>
```

## TypeScript Types

```tsx
import type {
  Address,
  Chain,
  PolygonKitConfig,
  TransactionCall,
} from '@polygon/polygon-kit';

// Address type
const address: Address = '0x...';

// Chain type
const customChain: Chain = {
  id: 137,
  name: 'Polygon',
  // ...
};

// Transaction call
const call: TransactionCall = {
  to: '0x...',
  value: BigInt(1e18),
  data: '0x...'
};
```

## Error Handling

```tsx
import { TransactionButton } from '@polygon/polygon-kit';

<TransactionButton
  calls={[{ to: '0x...', value: BigInt(1e18) }]}
  onError={(error) => {
    if (error.message.includes('insufficient funds')) {
      alert('Not enough balance!');
    } else if (error.message.includes('rejected')) {
      alert('Transaction rejected');
    } else {
      alert('Error: ' + error.message);
    }
  }}
/>
```

## Testing Connection

```tsx
import { usePolygonKit } from '@polygon/polygon-kit';

function ConnectionStatus() {
  const { address, isConnected, chain } = usePolygonKit();

  return (
    <div>
      <p>Status: {isConnected ? '✅ Connected' : '❌ Disconnected'}</p>
      {isConnected && (
        <>
          <p>Address: {address}</p>
          <p>Network: {chain?.name}</p>
        </>
      )}
    </div>
  );
}
```

## Common Issues

### 1. Wallet not connecting
```tsx
// Check if wallet is installed
if (typeof window.ethereum === 'undefined') {
  alert('Please install MetaMask!');
}
```

### 2. Wrong network
```tsx
import { useAccount, useSwitchChain } from 'wagmi';
import { polygon } from '@polygon/polygon-kit';

function NetworkGuard({ children }) {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  if (chain?.id !== polygon.id) {
    return (
      <button onClick={() => switchChain({ chainId: polygon.id })}>
        Switch to Polygon
      </button>
    );
  }

  return children;
}
```

### 3. Transaction failing
```tsx
// Check balance before sending
const { balance } = usePolygonBalance(address);
const hasEnoughBalance = balance >= amount + gasCost;
```

## Links

- [Full Documentation](./README.md)
- [Getting Started Guide](./GETTING_STARTED.md)
- [API Reference](./API_REFERENCE.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

**Need Help?** Check the [API Reference](./API_REFERENCE.md) for detailed documentation.
