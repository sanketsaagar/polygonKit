import { useState } from 'react';
import { useAccount, useDisconnect, useBalance, useSwitchChain } from 'wagmi';
import { WalletDropdownProps } from '../../types';
import { shortenAddress, formatBalance } from '../../utils/format';
import { polygon, polygonAmoy, polygonZkEVM } from '../../constants/chains';

export function WalletDropdown({ children, className = '' }: WalletDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { switchChain } = useSwitchChain();

  const handleDisconnect = () => {
    disconnect();
    setIsOpen(false);
  };

  const handleSwitchChain = (chainId: number) => {
    switchChain({ chainId });
    setIsOpen(false);
  };

  if (!isConnected || !address) {
    return null;
  }

  const supportedChains = [polygon, polygonAmoy, polygonZkEVM];

  return (
    <div className={`relative ${className}`}>
      <button
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 font-medium transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children || shortenAddress(address)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">Connected Account</div>
            <div className="font-medium mt-1">{shortenAddress(address)}</div>
            {balance && (
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {formatBalance(balance.value)} {balance.symbol}
              </div>
            )}
          </div>

          <div className="p-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">
              Switch Network
            </div>
            {supportedChains.map((supportedChain) => (
              <button
                key={supportedChain.id}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  chain?.id === supportedChain.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                }`}
                onClick={() => handleSwitchChain(supportedChain.id)}
              >
                <div className="flex items-center justify-between">
                  <span>{supportedChain.name}</span>
                  {chain?.id === supportedChain.id && (
                    <span className="text-purple-600 dark:text-purple-400">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              className="w-full text-left px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              onClick={handleDisconnect}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
