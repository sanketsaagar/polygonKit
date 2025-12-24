# PolygonKit Next.js Example

This example demonstrates how to use PolygonKit with Next.js App Router.

## Installation

```bash
npm install @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query
```

## Setup

1. Create `app/providers.tsx`:

```tsx
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
```

2. Wrap your app in `app/layout.tsx` with the Providers component.

3. Create `.env.local`:

```bash
NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here
```

Get your free project ID from [cloud.reown.com](https://cloud.reown.com)

## Usage

See `app/page.tsx` for a complete example.

## Learn More

- [PolygonKit Documentation](https://polygonlabs.mintlify.app)
- [Next.js Documentation](https://nextjs.org/docs)
