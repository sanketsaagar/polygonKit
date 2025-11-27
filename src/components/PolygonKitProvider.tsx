import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { polygon, polygonAmoy, polygonZkEVM } from '../constants/chains';
import { PolygonKitProviderProps } from '../types';

const queryClient = new QueryClient();

const projectId = process.env.VITE_PROJECT_ID || 'f6bd6e2911b56f5ac3bc8b2d0e2d7ad5';

export function PolygonKitProvider({
  children,
  config: userConfig,
}: PolygonKitProviderProps) {
  const chains = userConfig?.chains || [polygon, polygonAmoy, polygonZkEVM];
  const metadata = {
    name: userConfig?.appName || 'PolygonKit App',
    description: userConfig?.appDescription || 'Your Polygon App',
    url: userConfig?.appUrl || 'https://polygon.technology',
    icons: userConfig?.appIcons || ['https://avatars.githubusercontent.com/u/21101868'],
  };

  const wagmiAdapter = new WagmiAdapter({
    networks: chains as any,
    projectId: userConfig?.projectId || projectId,
  });

  createAppKit({
    adapters: [wagmiAdapter],
    networks: chains as any,
    projectId: userConfig?.projectId || projectId,
    metadata,
    features: {
      analytics: true,
    },
  });

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as any}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
