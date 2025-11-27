import { useBalance } from 'wagmi';
import type { Address } from 'viem';
import { formatBalance } from '../utils/format';

interface UsePolygonBalanceReturn {
  balance: bigint | undefined;
  formatted: string;
  symbol: string | undefined;
  decimals: number | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function usePolygonBalance(address?: Address, token?: Address): UsePolygonBalanceReturn {
  const { data, isLoading, isError, refetch } = useBalance({
    address,
    token,
  });

  const formattedBalance = data ? formatBalance(data.value, data.decimals) : '0';

  return {
    balance: data?.value,
    formatted: formattedBalance,
    symbol: data?.symbol,
    decimals: data?.decimals,
    isLoading,
    isError,
    refetch,
  };
}
