# PolygonKit Vite Example

This example demonstrates how to use PolygonKit with Vite + React.

## Installation

```bash
npm install @sanketsaagar/polygon-kit wagmi viem @tanstack/react-query
```

## Setup

1. Wrap your app in `src/main.tsx`:

```tsx
import { PolygonKitProvider } from '@sanketsaagar/polygon-kit';

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PolygonKitProvider config={{ projectId }}>
      <App />
    </PolygonKitProvider>
  </React.StrictMode>,
);
```

2. Create `.env`:

```bash
VITE_REOWN_PROJECT_ID=your_project_id_here
```

Get your free project ID from [cloud.reown.com](https://cloud.reown.com)

## Usage

See `src/App.tsx` for a complete example.

## Learn More

- [PolygonKit Documentation](https://polygonlabs.mintlify.app)
- [Vite Documentation](https://vitejs.dev)
