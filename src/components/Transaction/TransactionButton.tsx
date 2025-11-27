import { useState } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { TransactionButtonProps } from '../../types';

export function TransactionButton({
  text = 'Send Transaction',
  className = '',
  disabled = false,
  calls = [],
  onSuccess,
  onError,
}: TransactionButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const { sendTransaction, data: hash } = useSendTransaction();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const handleTransaction = async () => {
    if (calls.length === 0) {
      onError?.(new Error('No transaction calls provided'));
      return;
    }

    setIsPending(true);

    try {
      const call = calls[0];
      sendTransaction(
        {
          to: call.to,
          data: call.data,
          value: call.value,
        },
        {
          onSuccess: (hash) => {
            setIsPending(false);
            onSuccess?.(hash);
          },
          onError: (error) => {
            setIsPending(false);
            onError?.(error);
          },
        }
      );
    } catch (error) {
      setIsPending(false);
      onError?.(error as Error);
    }
  };

  const isLoading = isPending || isConfirming;

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        disabled || isLoading
          ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-700 text-white'
      } ${className}`}
      onClick={handleTransaction}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Processing...' : text}
    </button>
  );
}
