import { TokenProps } from '../../types';

export function Token({ amount, symbol, className = '' }: TokenProps) {
  const displayAmount = amount ? parseFloat(amount).toFixed(4) : '0.0000';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
        {symbol ? symbol.charAt(0) : '?'}
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{symbol || 'Unknown'}</span>
        {amount && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {displayAmount}
          </span>
        )}
      </div>
    </div>
  );
}
