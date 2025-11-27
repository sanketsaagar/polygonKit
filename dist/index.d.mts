import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Address, Hash } from 'viem';
import { Connector } from 'wagmi';

interface PolygonKitConfig {
    projectId?: string;
    rpcUrl?: string;
    chains?: Chain[];
}
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
        default: {
            http: string[];
        };
        public: {
            http: string[];
        };
    };
    blockExplorers: {
        default: {
            name: string;
            url: string;
        };
    };
}
interface WalletProps {
    children?: ReactNode;
    className?: string;
}
interface ConnectWalletProps {
    children?: ReactNode;
    className?: string;
    onConnect?: (address: Address) => void;
    onDisconnect?: () => void;
}
interface WalletDropdownProps {
    children?: ReactNode;
    className?: string;
}
interface IdentityProps {
    address: Address;
    className?: string;
    showAvatar?: boolean;
    showAddress?: boolean;
    showBalance?: boolean;
}
interface AvatarProps {
    address: Address;
    className?: string;
    size?: number;
}
interface NameProps {
    address: Address;
    className?: string;
}
interface TransactionProps {
    children?: ReactNode;
    className?: string;
    chainId?: number;
    onSuccess?: (hash: string) => void;
    onError?: (error: Error) => void;
}
interface TransactionButtonProps {
    text?: string;
    className?: string;
    disabled?: boolean;
    calls?: TransactionCall[];
    onSuccess?: (hash: string) => void;
    onError?: (error: Error) => void;
}
interface TransactionCall {
    to: Address;
    data?: `0x${string}`;
    value?: bigint;
}
interface TokenProps {
    address: Address;
    amount?: string;
    symbol?: string;
    className?: string;
}
interface TokenBalanceProps {
    address: Address;
    token?: Address;
    className?: string;
}
interface SwapProps {
    className?: string;
    onSuccess?: (hash: string) => void;
    onError?: (error: Error) => void;
}
type ThemeMode = 'light' | 'dark' | 'auto';
interface PolygonKitProviderProps {
    children: ReactNode;
    config?: PolygonKitConfig;
    theme?: ThemeMode;
}

declare function PolygonKitProvider({ children, config: userConfig, }: PolygonKitProviderProps): react_jsx_runtime.JSX.Element;

declare function Wallet({ children, className }: WalletProps): react_jsx_runtime.JSX.Element;

declare function ConnectWallet({ children, className, onConnect, onDisconnect: onDisconnectCallback, }: ConnectWalletProps): react_jsx_runtime.JSX.Element;

declare function WalletDropdown({ children, className }: WalletDropdownProps): react_jsx_runtime.JSX.Element | null;

declare function Identity({ address, className, showAvatar, showAddress, showBalance, }: IdentityProps): react_jsx_runtime.JSX.Element;

declare function Avatar({ address, className, size }: AvatarProps): react_jsx_runtime.JSX.Element;

declare function Name({ address, className }: NameProps): react_jsx_runtime.JSX.Element;

declare function Transaction({ children, className, chainId, }: TransactionProps): react_jsx_runtime.JSX.Element;

declare function TransactionButton({ text, className, disabled, calls, onSuccess, onError, }: TransactionButtonProps): react_jsx_runtime.JSX.Element;

interface TransactionStatusProps {
    hash: Hash;
    className?: string;
}
declare function TransactionStatus({ hash, className }: TransactionStatusProps): react_jsx_runtime.JSX.Element;

declare function Token({ amount, symbol, className }: TokenProps): react_jsx_runtime.JSX.Element;

declare function TokenBalance({ address, token, className }: TokenBalanceProps): react_jsx_runtime.JSX.Element;

declare function Swap({ className, onSuccess, onError }: SwapProps): react_jsx_runtime.JSX.Element;

interface UsePolygonKitReturn {
    address: Address | undefined;
    isConnected: boolean;
    chain: any;
    balance: any;
    connect: () => void;
    disconnect: () => void;
    connectors: readonly Connector[];
}
declare function usePolygonKit(): UsePolygonKitReturn;

interface UsePolygonBalanceReturn {
    balance: bigint | undefined;
    formatted: string;
    symbol: string | undefined;
    decimals: number | undefined;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
}
declare function usePolygonBalance(address?: Address, token?: Address): UsePolygonBalanceReturn;

interface UsePolygonTransactionReturn {
    send: (to: Address, value?: bigint, data?: `0x${string}`) => void;
    hash: Hash | undefined;
    isPending: boolean;
    isConfirming: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
}
declare function usePolygonTransaction(): UsePolygonTransactionReturn;

declare function shortenAddress(address: Address, chars?: number): string;
declare function formatBalance(balance: bigint, decimals?: number, displayDecimals?: number): string;
declare function parseTokenAmount(amount: string, decimals?: number): bigint;
declare function truncateText(text: string, maxLength: number): string;

declare const polygon: Chain;
declare const polygonMumbai: Chain;
declare const polygonAmoy: Chain;
declare const polygonZkEVM: Chain;
declare const defaultChains: Chain[];

export { Avatar, type AvatarProps, type Chain, ConnectWallet, type ConnectWalletProps, Identity, type IdentityProps, Name, type NameProps, type PolygonKitConfig, PolygonKitProvider, type PolygonKitProviderProps, Swap, type SwapProps, type ThemeMode, Token, TokenBalance, type TokenBalanceProps, type TokenProps, Transaction, TransactionButton, type TransactionButtonProps, type TransactionCall, type TransactionProps, TransactionStatus, Wallet, WalletDropdown, type WalletDropdownProps, type WalletProps, defaultChains, formatBalance, parseTokenAmount, polygon, polygonAmoy, polygonMumbai, polygonZkEVM, shortenAddress, truncateText, usePolygonBalance, usePolygonKit, usePolygonTransaction };
