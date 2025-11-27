// Provider
export { PolygonKitProvider } from './components/PolygonKitProvider';

// Wallet Components
export { Wallet, ConnectWallet, WalletDropdown } from './components/Wallet';

// Identity Components
export { Identity, Avatar, Name } from './components/Identity';

// Transaction Components
export { Transaction, TransactionButton, TransactionStatus } from './components/Transaction';

// Token Components
export { Token, TokenBalance } from './components/Token';

// Swap Components
export { Swap } from './components/Swap';

// Hooks
export { usePolygonKit, usePolygonBalance, usePolygonTransaction } from './hooks';

// Utils
export { shortenAddress, formatBalance, parseTokenAmount, truncateText } from './utils/format';

// Constants
export { polygon, polygonMumbai, polygonAmoy, polygonZkEVM, defaultChains } from './constants/chains';

// Types
export type {
  PolygonKitConfig,
  Chain,
  WalletProps,
  ConnectWalletProps,
  WalletDropdownProps,
  IdentityProps,
  AvatarProps,
  NameProps,
  TransactionProps,
  TransactionButtonProps,
  TransactionCall,
  TokenProps,
  TokenBalanceProps,
  SwapProps,
  ThemeMode,
  PolygonKitProviderProps,
} from './types';
