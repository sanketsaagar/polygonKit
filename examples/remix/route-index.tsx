import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  Identity,
  usePolygonKit,
} from '@sanketsaagar/polygon-kit';
import { ClientOnly } from '~/components/client-only';

function AppContent() {
  const { address, isConnected, chainId } = usePolygonKit();

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to PolygonKit</h1>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">My Polygon App</h1>
        <Wallet>
          <WalletDropdown />
        </Wallet>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <Identity
            address={address!}
            showAvatar
            showAddress
            showBalance
          />
        </div>

        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Network Info</h2>
          <p className="mb-2">Chain ID: {chainId}</p>
          <p className="text-gray-600 dark:text-gray-400">
            Connected to Polygon network
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <ClientOnly>
      {() => <AppContent />}
    </ClientOnly>
  );
}
