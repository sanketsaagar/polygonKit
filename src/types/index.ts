import { ReactNode } from 'react';
import { Address } from 'viem';

export interface PolygonKitConfig {
  projectId?: string;
  rpcUrl?: string;
  chains?: Chain[];
}

export interface Chain {
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

export interface WalletProps {
  children?: ReactNode;
  className?: string;
}

export interface ConnectWalletProps {
  children?: ReactNode;
  className?: string;
  onConnect?: (address: Address) => void;
  onDisconnect?: () => void;
}

export interface WalletDropdownProps {
  children?: ReactNode;
  className?: string;
}

export interface IdentityProps {
  address: Address;
  className?: string;
  showAvatar?: boolean;
  showAddress?: boolean;
  showBalance?: boolean;
}

export interface AvatarProps {
  address: Address;
  className?: string;
  size?: number;
}

export interface NameProps {
  address: Address;
  className?: string;
}

export interface TransactionProps {
  children?: ReactNode;
  className?: string;
  chainId?: number;
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
}

export interface TransactionButtonProps {
  text?: string;
  className?: string;
  disabled?: boolean;
  calls?: TransactionCall[];
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
}

export interface TransactionCall {
  to: Address;
  data?: `0x${string}`;
  value?: bigint;
}

export interface TokenProps {
  address: Address;
  amount?: string;
  symbol?: string;
  className?: string;
}

export interface TokenBalanceProps {
  address: Address;
  token?: Address;
  className?: string;
}

export interface SwapProps {
  className?: string;
  onSuccess?: (hash: string) => void;
  onError?: (error: Error) => void;
}

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface PolygonKitProviderProps {
  children: ReactNode;
  config?: PolygonKitConfig;
  theme?: ThemeMode;
}
