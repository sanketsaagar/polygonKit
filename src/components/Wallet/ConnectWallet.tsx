import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectWalletProps } from '../../types';
import { useEffect } from 'react';

export function ConnectWallet({
  children,
  className = '',
  onConnect,
  onDisconnect: onDisconnectCallback,
}: ConnectWalletProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address);
    }
  }, [isConnected, address, onConnect]);

  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
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
