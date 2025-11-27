# PolygonKit API Reference

Complete API documentation for all components, hooks, and utilities in PolygonKit.

## Table of Contents

- [Provider](#provider)
- [Wallet Components](#wallet-components)
- [Identity Components](#identity-components)
- [Transaction Components](#transaction-components)
- [Token Components](#token-components)
- [Swap Components](#swap-components)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Types](#types)
- [Constants](#constants)

## Provider

### PolygonKitProvider

Root provider component that sets up wagmi and React Query.

```tsx
<PolygonKitProvider
  config={{
    chains: [polygon, polygonAmoy],
    rpcUrl: 'https://custom-rpc.com',
  }}
  theme="dark"
>
  {children}
</PolygonKitProvider>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Child components |
| `config` | `PolygonKitConfig` | `undefined` | Custom configuration |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Theme mode |

**PolygonKitConfig:**

```typescript
interface PolygonKitConfig {
  projectId?: string;
  rpcUrl?: string;
  chains?: Chain[];
}
```

---

## Wallet Components

### Wallet

Container component for wallet-related elements.

```tsx
<Wallet className="custom-class">
  <ConnectWallet />
  <WalletDropdown />
</Wallet>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Child components |
| `className` | `string` | `''` | CSS classes |

---

### ConnectWallet

Button for connecting and disconnecting wallet.

```tsx
<ConnectWallet
  onConnect={(address) => console.log('Connected:', address)}
  onDisconnect={() => console.log('Disconnected')}
  className="custom-button"
>
  Custom Button Content
</ConnectWallet>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Custom button content |
| `className` | `string` | `''` | CSS classes |
| `onConnect` | `(address: Address) => void` | `undefined` | Connection callback |
| `onDisconnect` | `() => void` | `undefined` | Disconnection callback |

**Default Styling:**
- Connected: Red background with hover effect
- Disconnected: Purple background with hover effect

---

### WalletDropdown

Dropdown menu with account info and network switching.

```tsx
<WalletDropdown className="custom-class">
  Custom Trigger Content
</WalletDropdown>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Custom trigger content |
| `className` | `string` | `''` | CSS classes |

**Features:**
- Shows connected address
- Displays current balance
- Network switching for Polygon, Amoy, zkEVM
- Disconnect option

---

## Identity Components

### Identity

Complete identity display with avatar, name, and balance.

```tsx
<Identity
  address="0x..."
  showAvatar={true}
  showAddress={true}
  showBalance={true}
  className="profile-card"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `Address` | Required | Wallet address |
| `className` | `string` | `''` | CSS classes |
| `showAvatar` | `boolean` | `true` | Display avatar |
| `showAddress` | `boolean` | `true` | Display address |
| `showBalance` | `boolean` | `false` | Display balance |

---

### Avatar

Generated avatar with gradient colors based on address.

```tsx
<Avatar
  address="0x..."
  size={48}
  className="rounded-full"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `Address` | Required | Wallet address |
| `size` | `number` | `40` | Avatar size (px) |
| `className` | `string` | `''` | CSS classes |

**Features:**
- Deterministic gradient colors
- Shows first 2 characters of address
- Consistent colors for same address

---

### Name

Display ENS name or shortened address.

```tsx
<Name
  address="0x..."
  className="font-bold"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `Address` | Required | Wallet address |
| `className` | `string` | `''` | CSS classes |

**Behavior:**
- Shows ENS name if available
- Falls back to shortened address (0x1234...5678)

---

## Transaction Components

### Transaction

Container for transaction-related components with chain validation.

```tsx
<Transaction
  chainId={137}
  onSuccess={(hash) => console.log(hash)}
  onError={(error) => console.error(error)}
>
  <TransactionButton />
</Transaction>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Child components |
| `className` | `string` | `''` | CSS classes |
| `chainId` | `number` | `undefined` | Required chain ID |
| `onSuccess` | `(hash: string) => void` | `undefined` | Success callback |
| `onError` | `(error: Error) => void` | `undefined` | Error callback |

---

### TransactionButton

Button to execute transactions.

```tsx
<TransactionButton
  text="Send Transaction"
  calls={[
    {
      to: '0x...',
      value: BigInt(1000000000000000000),
      data: '0x...'
    }
  ]}
  onSuccess={(hash) => console.log('Success:', hash)}
  onError={(error) => console.error('Error:', error)}
  disabled={false}
  className="w-full"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `'Send Transaction'` | Button text |
| `className` | `string` | `''` | CSS classes |
| `disabled` | `boolean` | `false` | Disable button |
| `calls` | `TransactionCall[]` | `[]` | Transaction calls |
| `onSuccess` | `(hash: string) => void` | `undefined` | Success callback |
| `onError` | `(error: Error) => void` | `undefined` | Error callback |

**TransactionCall:**

```typescript
interface TransactionCall {
  to: Address;
  data?: `0x${string}`;
  value?: bigint;
}
```

---

### TransactionStatus

Display transaction confirmation status.

```tsx
<TransactionStatus
  hash="0x..."
  className="status-indicator"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hash` | `Hash` | Required | Transaction hash |
| `className` | `string` | `''` | CSS classes |

**States:**
- Loading: Yellow with spinner
- Success: Green with checkmark
- Error: Red with X

---

## Token Components

### Token

Display token information with icon.

```tsx
<Token
  address="0x..."
  symbol="USDC"
  amount="100.50"
  className="token-display"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `Address` | Required | Token address |
| `amount` | `string` | `undefined` | Token amount |
| `symbol` | `string` | `undefined` | Token symbol |
| `className` | `string` | `''` | CSS classes |

---

### TokenBalance

Display token balance for an address.

```tsx
<TokenBalance
  address="0x..."
  token="0x..." // Optional
  className="balance-text"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `address` | `Address` | Required | Wallet address |
| `token` | `Address` | `undefined` | Token address (native if omitted) |
| `className` | `string` | `''` | CSS classes |

**Features:**
- Shows loading state
- Formats balance with decimals
- Displays token symbol

---

## Swap Components

### Swap

Complete swap interface (integrate with DEX aggregator).

```tsx
<Swap
  onSuccess={(hash) => console.log('Swap complete:', hash)}
  onError={(error) => console.error('Swap failed:', error)}
  className="swap-widget"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | CSS classes |
| `onSuccess` | `(hash: string) => void` | `undefined` | Success callback |
| `onError` | `(error: Error) => void` | `undefined` | Error callback |

**Note:** This is a UI component. Integrate with 1inch, 0x, or Uniswap for actual swapping functionality.

---

## Hooks

### usePolygonKit()

Main hook for wallet state and operations.

```tsx
const {
  address,
  isConnected,
  chain,
  balance,
  connect,
  disconnect,
  connectors
} = usePolygonKit();
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `address` | `Address \| undefined` | Connected wallet address |
| `isConnected` | `boolean` | Connection status |
| `chain` | `Chain \| undefined` | Current chain info |
| `balance` | `{ value: bigint, symbol: string } \| undefined` | Native token balance |
| `connect` | `() => void` | Connect wallet function |
| `disconnect` | `() => void` | Disconnect function |
| `connectors` | `Connector[]` | Available connectors |

---

### usePolygonBalance()

Get formatted token balance.

```tsx
const {
  balance,
  formatted,
  symbol,
  decimals,
  isLoading,
  isError,
  refetch
} = usePolygonBalance(address, tokenAddress);
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `address` | `Address` | No | Wallet address |
| `token` | `Address` | No | Token address |

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `balance` | `bigint \| undefined` | Raw balance |
| `formatted` | `string` | Formatted balance |
| `symbol` | `string \| undefined` | Token symbol |
| `decimals` | `number \| undefined` | Token decimals |
| `isLoading` | `boolean` | Loading state |
| `isError` | `boolean` | Error state |
| `refetch` | `() => void` | Refetch function |

---

### usePolygonTransaction()

Send transactions with status tracking.

```tsx
const {
  send,
  hash,
  isPending,
  isConfirming,
  isSuccess,
  isError,
  error
} = usePolygonTransaction();

// Send transaction
send(toAddress, value, data);
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `send` | `(to: Address, value?: bigint, data?: Hex) => void` | Send function |
| `hash` | `Hash \| undefined` | Transaction hash |
| `isPending` | `boolean` | Transaction pending |
| `isConfirming` | `boolean` | Confirming on chain |
| `isSuccess` | `boolean` | Transaction succeeded |
| `isError` | `boolean` | Transaction failed |
| `error` | `Error \| undefined` | Error details |

---

## Utilities

### shortenAddress()

Shorten an Ethereum address.

```tsx
shortenAddress('0x1234567890123456789012345678901234567890', 4)
// Returns: '0x1234...7890'
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `address` | `Address` | Required | Full address |
| `chars` | `number` | `4` | Characters to show |

**Returns:** `string`

---

### formatBalance()

Format a bigint balance to decimal string.

```tsx
formatBalance(BigInt('1500000000000000000'), 18, 4)
// Returns: '1.5000'
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `balance` | `bigint` | Required | Raw balance |
| `decimals` | `number` | `18` | Token decimals |
| `displayDecimals` | `number` | `4` | Display decimals |

**Returns:** `string`

---

### parseTokenAmount()

Parse decimal string to bigint.

```tsx
parseTokenAmount('1.5', 18)
// Returns: 1500000000000000000n
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `amount` | `string` | Required | Amount string |
| `decimals` | `number` | `18` | Token decimals |

**Returns:** `bigint`

---

### truncateText()

Truncate text to maximum length.

```tsx
truncateText('This is a long text', 10)
// Returns: 'This is a ...'
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `text` | `string` | Text to truncate |
| `maxLength` | `number` | Maximum length |

**Returns:** `string`

---

## Types

### Address

```typescript
type Address = `0x${string}`;
```

### Chain

```typescript
interface Chain {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: { http: string[] };
    public: { http: string[] };
  };
  blockExplorers: {
    default: { name: string; url: string };
  };
}
```

### PolygonKitConfig

```typescript
interface PolygonKitConfig {
  projectId?: string;
  rpcUrl?: string;
  chains?: Chain[];
}
```

---

## Constants

### Supported Chains

#### polygon

```typescript
{
  id: 137,
  name: 'Polygon',
  network: 'matic',
  // ...
}
```

#### polygonMumbai

```typescript
{
  id: 80001,
  name: 'Polygon Mumbai',
  network: 'maticmum',
  // ...
}
```

#### polygonAmoy

```typescript
{
  id: 80002,
  name: 'Polygon Amoy',
  network: 'polygon-amoy',
  // ...
}
```

#### polygonZkEVM

```typescript
{
  id: 1101,
  name: 'Polygon zkEVM',
  network: 'polygon-zkevm',
  // ...
}
```

#### defaultChains

```typescript
const defaultChains = [polygon, polygonAmoy, polygonZkEVM];
```

---

## Advanced Usage

### Custom Chain Configuration

```tsx
import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';

const customChain = {
  id: 137,
  name: 'Custom Polygon',
  network: 'matic',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://your-rpc.com'] },
    public: { http: ['https://your-rpc.com'] },
  },
  blockExplorers: {
    default: {
      name: 'PolygonScan',
      url: 'https://polygonscan.com'
    },
  },
};

<PolygonKitProvider config={{ chains: [customChain] }}>
  <App />
</PolygonKitProvider>
```

### Programmatic Transactions

```tsx
import { usePolygonTransaction } from '@sanketsaagar/polygon-kit';
import { encodeFunctionData } from 'viem';

function TransferToken() {
  const { send } = usePolygonTransaction();

  const handleTransfer = () => {
    const data = encodeFunctionData({
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [recipient, amount],
    });

    send(tokenAddress, undefined, data);
  };

  return <button onClick={handleTransfer}>Transfer</button>;
}
```

---

For more examples and guides, see [GETTING_STARTED.md](./GETTING_STARTED.md) and [README.md](./README.md).
