# PolygonKit Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      User Application                        │
│  (Your React App using PolygonKit components & hooks)       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  PolygonKitProvider                          │
│  - Wraps app with Wagmi & React Query providers             │
│  - Configures chains, connectors, RPC endpoints             │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼────┐  ┌───▼──────┐  ┌─▼────────┐
│ Components │  │  Hooks   │  │ Utilities│
└────────────┘  └──────────┘  └──────────┘
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Components                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Wallet Components                                    │  │
│  │  - ConnectWallet: Connection button                 │  │
│  │  - WalletDropdown: Account menu & network switch    │  │
│  │  - Wallet: Container component                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Identity Components                                  │  │
│  │  - Identity: Complete user profile                  │  │
│  │  - Avatar: Gradient avatar generator                │  │
│  │  - Name: ENS name resolution                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Transaction Components                               │  │
│  │  - Transaction: Transaction wrapper                 │  │
│  │  - TransactionButton: Execute transactions          │  │
│  │  - TransactionStatus: Status indicator              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Token Components                                     │  │
│  │  - Token: Token display with icon                   │  │
│  │  - TokenBalance: Balance tracker                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Swap Components                                      │  │
│  │  - Swap: Token swap interface                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Hook Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                           Hooks                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  usePolygonKit()                                            │
│    ├─→ useAccount() [wagmi]                                │
│    ├─→ useConnect() [wagmi]                                │
│    ├─→ useDisconnect() [wagmi]                             │
│    └─→ useBalance() [wagmi]                                │
│                                                              │
│  usePolygonBalance()                                        │
│    ├─→ useBalance() [wagmi]                                │
│    └─→ formatBalance() [utils]                             │
│                                                              │
│  usePolygonTransaction()                                    │
│    ├─→ useSendTransaction() [wagmi]                        │
│    └─→ useWaitForTransactionReceipt() [wagmi]              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐
│     User     │
│   Interacts  │
└──────┬───────┘
       │
       ▼
┌──────────────┐         ┌──────────────┐
│  Component   │◄────────│   Hook       │
│  (UI Layer)  │         │ (Logic Layer)│
└──────┬───────┘         └──────┬───────┘
       │                        │
       │                        ▼
       │                 ┌──────────────┐
       │                 │    Wagmi     │
       │                 │  (Web3 Layer)│
       │                 └──────┬───────┘
       │                        │
       ▼                        ▼
┌──────────────┐         ┌──────────────┐
│   Utility    │         │  Blockchain  │
│  Functions   │         │   (Polygon)  │
└──────────────┘         └──────────────┘
```

## Wallet Connection Flow

```
User clicks ConnectWallet
        │
        ▼
ConnectWallet component
        │
        ├─→ useConnect() hook
        │   └─→ Find injected connector
        │       └─→ Call connect()
        │
        ▼
Wagmi handles wallet connection
        │
        ├─→ Request wallet access
        │   └─→ User approves in wallet
        │
        ▼
Connection successful
        │
        ├─→ useAccount() returns address
        ├─→ useBalance() fetches balance
        └─→ Components re-render with data
```

## Transaction Flow

```
User clicks TransactionButton
        │
        ▼
TransactionButton validates inputs
        │
        ├─→ Check connection
        ├─→ Check network
        └─→ Check calls array
        │
        ▼
useSendTransaction() hook
        │
        ├─→ Prepare transaction
        ├─→ Estimate gas
        └─→ Send to wallet
        │
        ▼
Wallet prompts user
        │
        ├─→ Show transaction details
        └─→ User approves/rejects
        │
        ▼
Transaction sent to blockchain
        │
        ├─→ Transaction pending
        ├─→ useWaitForTransactionReceipt() polls
        └─→ Transaction confirmed
        │
        ▼
Callbacks fired
        │
        ├─→ onSuccess(hash) called
        └─→ UI updates
```

## Provider Configuration

```
App Start
    │
    ▼
PolygonKitProvider initialized
    │
    ├─→ Create Wagmi config
    │   ├─→ Set chains (Polygon, Amoy, zkEVM)
    │   ├─→ Configure RPC endpoints
    │   └─→ Set up connectors
    │
    ├─→ Create QueryClient
    │   ├─→ Set cache time
    │   └─→ Configure retries
    │
    └─→ Wrap app with providers
        ├─→ WagmiProvider
        └─→ QueryClientProvider
            │
            ▼
        App renders with context
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                      State Layers                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Component State (useState)                                 │
│    └─→ Local UI state (dropdowns, modals, forms)           │
│                                                              │
│  Wagmi State (useAccount, useBalance, etc.)                 │
│    └─→ Wallet connection, blockchain data                  │
│                                                              │
│  React Query State (TanStack Query)                         │
│    └─→ Caching, refetching, loading states                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Dependency Graph

```
┌─────────────────┐
│  PolygonKit     │
└────────┬────────┘
         │
    ┌────┼────┬─────────┬──────────┐
    │    │    │         │          │
┌───▼┐ ┌─▼──┐ ┌▼─────┐ ┌▼───────┐ ┌▼──────┐
│Wagmi│ │Viem│ │ React│ │ Query  │ │Radix  │
│     │ │    │ │      │ │        │ │  UI   │
└─────┘ └────┘ └──────┘ └────────┘ └───────┘
```

## Build Process

```
Source Code (TypeScript)
        │
        ▼
    ┌───────┐
    │ tsup  │ - TypeScript compilation
    │       │ - Bundle creation
    │       │ - Type definitions
    └───┬───┘
        │
        ▼
    dist/
    ├── index.js        (CommonJS)
    ├── index.esm.js    (ES Modules)
    └── index.d.ts      (Type definitions)
```

## Component Lifecycle

```
Component Mount
    │
    ├─→ Check wallet connection
    │   └─→ useAccount() hook
    │
    ├─→ Fetch blockchain data
    │   ├─→ useBalance()
    │   └─→ useEnsName()
    │
    └─→ Subscribe to updates
        ├─→ Account changes
        ├─→ Chain changes
        └─→ Balance changes
        │
        ▼
Component Render
        │
        ├─→ Display UI
        └─→ Handle user input
        │
        ▼
Component Update
        │
        ├─→ Re-fetch data if needed
        └─→ Re-render with new data
        │
        ▼
Component Unmount
        │
        └─→ Cleanup subscriptions
```

## Error Handling

```
Error Occurs
    │
    ├─→ Component level
    │   ├─→ Try/catch blocks
    │   └─→ Error callbacks (onError)
    │
    ├─→ Hook level
    │   ├─→ Wagmi error states
    │   └─→ Query error handling
    │
    └─→ Provider level
        ├─→ Global error boundaries
        └─→ Fallback UI
```

## Security Considerations

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Measures                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Input Validation                                           │
│    ├─→ Address format validation                           │
│    ├─→ Amount range checks                                 │
│    └─→ Data sanitization                                   │
│                                                              │
│  Transaction Safety                                         │
│    ├─→ User confirmation required                          │
│    ├─→ Gas estimation                                      │
│    └─→ Network validation                                  │
│                                                              │
│  Data Handling                                              │
│    ├─→ No private key storage                              │
│    ├─→ Read-only blockchain calls                          │
│    └─→ Secure RPC connections                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────┐
│                  Performance Features                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Component Optimization                                     │
│    ├─→ React.memo for expensive components                 │
│    ├─→ useMemo for computed values                         │
│    └─→ useCallback for event handlers                      │
│                                                              │
│  Data Fetching                                              │
│    ├─→ React Query caching                                 │
│    ├─→ Automatic refetch on focus                          │
│    └─→ Stale-while-revalidate                              │
│                                                              │
│  Bundle Optimization                                        │
│    ├─→ Tree-shaking friendly exports                       │
│    ├─→ Code splitting support                              │
│    └─→ Minimal dependencies                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Extension Points

```
┌─────────────────────────────────────────────────────────────┐
│                    Customization                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Component Level                                            │
│    ├─→ className prop for styling                          │
│    ├─→ children prop for custom content                    │
│    └─→ Callback props for behavior                         │
│                                                              │
│  Provider Level                                             │
│    ├─→ Custom chains configuration                         │
│    ├─→ Custom RPC endpoints                                │
│    └─→ Theme customization                                 │
│                                                              │
│  Hook Level                                                 │
│    ├─→ Composable with other hooks                         │
│    ├─→ Access to underlying wagmi hooks                    │
│    └─→ Custom data transformations                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Testing Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      Testing Layers                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Unit Tests                                                 │
│    ├─→ Utility functions                                   │
│    ├─→ Component logic                                     │
│    └─→ Hook behavior                                       │
│                                                              │
│  Integration Tests                                          │
│    ├─→ Component + Hook interaction                        │
│    ├─→ Provider setup                                      │
│    └─→ Multi-component workflows                           │
│                                                              │
│  E2E Tests                                                  │
│    ├─→ Full user flows                                     │
│    ├─→ Wallet connection                                   │
│    └─→ Transaction execution                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
Development
    │
    ├─→ Local development (pnpm dev)
    └─→ Type checking (pnpm type-check)
        │
        ▼
Build
    │
    ├─→ Compile TypeScript
    ├─→ Generate type definitions
    └─→ Create bundles (CJS + ESM)
        │
        ▼
Publish
    │
    ├─→ npm registry
    └─→ Users install via npm/yarn/pnpm
        │
        ▼
Usage
    │
    ├─→ Import components
    ├─→ Use hooks
    └─→ Build applications
```

---

This architecture is designed to be:
- **Modular**: Components and hooks can be used independently
- **Extensible**: Easy to add new features
- **Type-safe**: Full TypeScript support
- **Performant**: Optimized for production use
- **Developer-friendly**: Clear APIs and documentation
