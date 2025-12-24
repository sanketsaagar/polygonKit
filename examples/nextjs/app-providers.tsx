'use client';

import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

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
