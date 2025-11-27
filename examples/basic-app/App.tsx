import {
  PolygonKitProvider,
  Wallet,
  ConnectWallet,
  WalletDropdown,
  Identity,
  TransactionButton,
  TokenBalance,
  Swap,
  usePolygonKit,
} from '@polygon/polygon-kit';

function Dashboard() {
  const { address, isConnected, chain } = usePolygonKit();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to PolygonKit</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect your wallet to get started
          </p>
        </div>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PolygonKit Demo
            </h1>
            {chain && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                {chain.name}
              </span>
            )}
          </div>
          <Wallet>
            <WalletDropdown />
          </Wallet>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <Identity
              address={address!}
              showAvatar
              showAddress
              showBalance
              className="mb-6"
            />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Balance:</span>
                <TokenBalance address={address!} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <TransactionButton
                text="Send Test Transaction"
                calls={[
                  {
                    to: address!,
                    value: BigInt(0),
                  },
                ]}
                onSuccess={(hash) => {
                  console.log('Transaction success:', hash);
                  alert(`Transaction sent! Hash: ${hash}`);
                }}
                onError={(error) => {
                  console.error('Transaction error:', error);
                  alert(`Error: ${error.message}`);
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Swap
            onSuccess={(hash) => {
              console.log('Swap success:', hash);
              alert(`Swap successful! Hash: ${hash}`);
            }}
            onError={(error) => {
              console.error('Swap error:', error);
              alert(`Swap failed: ${error.message}`);
            }}
          />
        </div>

        <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-bold mb-2">Wallet Management</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect, disconnect, and manage your wallet with ease
              </p>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h3 className="font-bold mb-2">Identity System</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display user profiles with ENS support and avatars
              </p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-bold mb-2">Transactions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Send transactions and track their status
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-900 mt-8 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Built with PolygonKit - A comprehensive toolkit for Polygon dApps</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <PolygonKitProvider>
      <Dashboard />
    </PolygonKitProvider>
  );
}

export default App;
