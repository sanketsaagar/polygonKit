import { useBalance } from 'wagmi';
import { TokenBalanceProps } from '../../types';
import { formatBalance } from '../../utils/format';

export function TokenBalance({ address, token, className = '' }: TokenBalanceProps) {
  const { data: balance, isLoading } = useBalance({
    address,
    token,
  });

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
      </div>
    );
  }

  if (!balance) {
    return <div className={className}>-</div>;
  }

  return (
    <div className={`font-medium ${className}`}>
      {formatBalance(balance.value)} {balance.symbol}
    </div>
  );
}
