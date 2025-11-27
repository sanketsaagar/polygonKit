import { useState } from 'react';
import { SwapProps } from '../../types';

export function Swap({ className = '', onSuccess, onError }: SwapProps) {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = async () => {
    setIsLoading(true);
    try {
      // This is a placeholder - integrate with actual DEX aggregator
      // like 1inch, 0x, or Uniswap on Polygon
      await new Promise(resolve => setTimeout(resolve, 2000));

      onSuccess?.('0x...');
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <h3 className="text-lg font-bold mb-4">Swap Tokens</h3>

      <div className="space-y-2">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <label className="text-sm text-gray-600 dark:text-gray-400">From</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium outline-none"
            />
            <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium">
              MATIC
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
            ↓
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <label className="text-sm text-gray-600 dark:text-gray-400">To</label>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="number"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-medium outline-none"
            />
            <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium">
              USDC
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSwap}
        disabled={isLoading || !fromAmount}
        className={`w-full mt-4 px-4 py-3 rounded-lg font-medium transition-colors ${
          isLoading || !fromAmount
            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {isLoading ? 'Swapping...' : 'Swap'}
      </button>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        Powered by Polygon DEX Aggregators
      </div>
    </div>
  );
}
