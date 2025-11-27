import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { ConnectWalletProps } from '../../types';
import { useEffect } from 'react';

export function ConnectWallet({
  children,
  className = '',
  onConnect,
  onDisconnect: onDisconnectCallback,
}: ConnectWalletProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();

  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    }
  }, [isConnected, address, onConnect]);

  const handleConnect = () => {
    open();
  };

  const handleDisconnect = () => {
    disconnect();
    if (onDisconnectCallback) {
      onDisconnectCallback();
    }
  };

  if (children) {
    return (
      <div className={className} onClick={isConnected ? handleDisconnect : handleConnect}>
        {children}
      </div>
    );
  }

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isConnected
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-purple-600 hover:bg-purple-700 text-white'
      } ${className}`}
      onClick={isConnected ? handleDisconnect : handleConnect}
    >
      {isConnected ? 'Disconnect' : 'Connect Wallet'}
    </button>
  );
}
