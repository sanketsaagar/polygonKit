import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import type { Address, Hash } from 'viem';

interface UsePolygonTransactionReturn {
  send: (to: Address, value?: bigint, data?: `0x${string}`) => void;
  hash: Hash | undefined;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
}

export function usePolygonTransaction(): UsePolygonTransactionReturn {
  const { sendTransaction, data: hash, isPending, isError, error } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const send = (to: Address, value?: bigint, data?: `0x${string}`) => {
    sendTransaction({
      to,
      value,
      data,
    });
  };

  return {
    send,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
  };
}
