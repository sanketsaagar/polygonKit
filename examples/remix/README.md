# PolygonKit Remix Example

This example demonstrates how to use PolygonKit with Remix.

## Installation

```bash
npm install @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query
```

## Setup

1. Create `app/components/providers.tsx`:

```tsx
import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const projectId = typeof window !== 'undefined'
    ? (window as any).ENV?.VITE_REOWN_PROJECT_ID
    : undefined;

  return (
    <PolygonKitProvider config={{ projectId }}>
      {children}
    </PolygonKitProvider>
  );
}
```

2. Wrap your app in `app/root.tsx` with the Providers component.

3. Create `.env`:

```bash
VITE_REOWN_PROJECT_ID=your_project_id_here
```

Get your free project ID from [cloud.reown.com](https://cloud.reown.com)

## Important: Client-Only Components

Use the `ClientOnly` wrapper for wallet components to prevent SSR hydration issues:

```tsx
import { ClientOnly } from '~/components/client-only';

export default function Index() {
  return (
    <ClientOnly>
      {() => <YourWalletComponent />}
    </ClientOnly>
  );
}
```

## Usage

See the example files for complete implementation.

## Learn More

- [PolygonKit Documentation](https://polygonlabs.mintlify.app)
- [Remix Documentation](https://remix.run/docs)
