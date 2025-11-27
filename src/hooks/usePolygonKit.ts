import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import type { Address } from 'viem';
import type { Connector } from 'wagmi';

interface UsePolygonKitReturn {
  address: Address | undefined;
  isConnected: boolean;
  chain: any;
  balance: any;
  connect: () => void;
  disconnect: () => void;
  connectors: readonly Connector[];
}

export function usePolygonKit(): UsePolygonKitReturn {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const connectWallet = () => {
    const injectedConnector = connectors.find((c) => c.id === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  return {
    address,
    isConnected,
    chain,
    balance,
    connect: connectWallet,
    disconnect,
    connectors,
  };
}
