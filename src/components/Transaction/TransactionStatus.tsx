import { useWaitForTransactionReceipt } from 'wagmi';
import { Hash } from 'viem';

interface TransactionStatusProps {
  hash: Hash;
  className?: string;
}

export function TransactionStatus({ hash, className = '' }: TransactionStatusProps) {
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {isLoading && (
        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          <span>Confirming...</span>
        </div>
      )}
      {isSuccess && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <span>✓</span>
          <span>Transaction confirmed</span>
        </div>
      )}
      {isError && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <span>✗</span>
          <span>Transaction failed</span>
        </div>
      )}
    </div>
  );
}
