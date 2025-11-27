import { TransactionProps } from '../../types';
import { useAccount } from 'wagmi';

export function Transaction({
  children,
  className = '',
  chainId,
}: TransactionProps) {
  const { chain } = useAccount();

  if (chainId && chain?.id !== chainId) {
    return (
      <div className={`text-red-500 ${className}`}>
        Please switch to the correct network
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
}
