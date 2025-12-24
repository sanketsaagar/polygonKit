import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const projectId = typeof window !== 'undefined'
    ? (window as any).ENV?.VITE_REOWN_PROJECT_ID
    : undefined;

  return (
    <PolygonKitProvider
      config={{
        projectId,
      }}
    >
      {children}
    </PolygonKitProvider>
  );
}
