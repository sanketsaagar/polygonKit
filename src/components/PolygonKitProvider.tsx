import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { polygon, polygonAmoy, polygonZkEVM } from '../constants/chains';
import { PolygonKitProviderProps } from '../types';

const queryClient = new QueryClient();

export function PolygonKitProvider({
  children,
  config: userConfig,
}: PolygonKitProviderProps) {
  const chains = userConfig?.chains || [polygon, polygonAmoy, polygonZkEVM];

  const config = createConfig({
    chains: chains as any,
    transports: chains.reduce((acc, chain) => {
      acc[chain.id] = http(chain.rpcUrls.default.http[0]);
      return acc;
    }, {} as Record<number, ReturnType<typeof http>>),
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
